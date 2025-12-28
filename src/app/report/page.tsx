'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserProfileCard from '@/components/UserProfileCard';
import GapChart from '@/components/GapChart';
import FeedbackCarousel from '@/components/FeedbackCarousel';
import { ReportData } from '@/types';

type AuthStep = 'name' | 'email' | 'loading' | 'verified' | 'error';

function ReportContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const urlName = searchParams.get('name');
    const urlVerified = searchParams.get('verified') === 'true';

    const [step, setStep] = useState<AuthStep>('name');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailHints, setEmailHints] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [reportData, setReportData] = useState<ReportData | null>(null);

    // URL에서 이름과 verified 파라미터가 있으면 바로 데이터 로드
    useEffect(() => {
        if (urlName && urlVerified) {
            loadReportData(urlName);
        }
    }, [urlName, urlVerified]);

    const loadReportData = async (userName: string) => {
        setStep('loading');
        try {
            const res = await fetch(`/api/report?name=${encodeURIComponent(userName)}`);
            const data = await res.json();

            if (data.error) {
                setErrorMessage(data.error);
                setStep('error');
            } else {
                setReportData(data);
                setStep('verified');
            }
        } catch {
            setErrorMessage('데이터를 불러오는데 실패했습니다.');
            setStep('error');
        }
    };

    // Step 1: 이름 확인
    const handleNameSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setStep('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), step: 'check-name' }),
            });

            const data = await res.json();

            if (!data.found) {
                setErrorMessage(data.message || '해당 이름으로 등록된 사용자를 찾을 수 없습니다.');
                setStep('name');
                return;
            }

            setEmailHints(data.emailHints || []);
            setStep('email');
        } catch {
            setErrorMessage('확인 중 오류가 발생했습니다.');
            setStep('name');
        }
    };

    // Step 2: 이메일 인증
    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setStep('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    step: 'verify-email'
                }),
            });

            const data = await res.json();

            if (!data.verified) {
                setErrorMessage(data.message || '이메일이 일치하지 않습니다.');
                setStep('email');
                return;
            }

            // 인증 성공 - URL 업데이트 및 데이터 로드
            router.replace(`/report?name=${encodeURIComponent(name.trim())}&verified=true`);
            loadReportData(name.trim());
        } catch {
            setErrorMessage('인증 중 오류가 발생했습니다.');
            setStep('email');
        }
    };

    const handleBack = () => {
        setStep('name');
        setEmail('');
        setEmailHints([]);
        setErrorMessage('');
    };

    // 로딩 화면
    if (step === 'loading') {
        return (
            <main className="min-h-screen bg-white text-black flex items-center justify-center">
                <div className="text-center">
                    <div className="text-2xl font-light mb-4">확인 중...</div>
                    <p className="text-gray-500">잠시만 기다려주세요</p>
                </div>
            </main>
        );
    }

    // Step 1: 이름 입력 화면
    if (step === 'name' && !urlVerified) {
        return (
            <main className="min-h-screen bg-white text-black">
                <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-xl font-medium tracking-tight">
                            Self Narrative
                        </Link>
                        <nav className="flex items-center gap-8">
                            <Link href="/" className="text-sm text-gray-600 hover:text-black transition-colors">
                                홈
                            </Link>
                            <a
                                href="https://tally.so/r/ODl9AK"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-600 hover:text-black transition-colors"
                            >
                                설문하기
                            </a>
                        </nav>
                    </div>
                </header>

                <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
                    <div className="max-w-md w-full text-center">
                        <p className="text-sm text-gray-500 mb-2 tracking-widest uppercase">
                            Step 1 of 2
                        </p>
                        <h1 className="text-3xl font-light mb-4">
                            <span className="font-medium">이름</span> 입력
                        </h1>
                        <p className="text-gray-600 mb-8">
                            설문에 참여하신 분의 이름을 입력해주세요
                        </p>

                        <form onSubmit={handleNameSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="이름 입력"
                                className="w-full px-6 py-4 bg-gray-50 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-black/10"
                                autoFocus
                            />
                            {errorMessage && (
                                <p className="text-red-500 text-sm">{errorMessage}</p>
                            )}
                            <button
                                type="submit"
                                className="w-full py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                            >
                                다음
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <p className="text-sm text-gray-500 mb-4">아직 설문에 참여하지 않으셨나요?</p>
                            <a
                                href="https://tally.so/r/ODl9AK"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black font-medium hover:underline"
                            >
                                설문 시작하기 →
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    // Step 2: 이메일 입력 화면
    if (step === 'email') {
        return (
            <main className="min-h-screen bg-white text-black">
                <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-xl font-medium tracking-tight">
                            Self Narrative
                        </Link>
                        <nav className="flex items-center gap-8">
                            <button
                                onClick={handleBack}
                                className="text-sm text-gray-600 hover:text-black transition-colors"
                            >
                                ← 뒤로
                            </button>
                        </nav>
                    </div>
                </header>

                <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
                    <div className="max-w-md w-full text-center">
                        <p className="text-sm text-gray-500 mb-2 tracking-widest uppercase">
                            Step 2 of 2
                        </p>
                        <h1 className="text-3xl font-light mb-4">
                            <span className="font-medium">이메일</span> 확인
                        </h1>
                        <p className="text-gray-600 mb-4">
                            <span className="font-medium">{name}</span>님, 본인 확인을 위해
                            <br />이메일을 입력해주세요
                        </p>

                        {/* 이메일 힌트 표시 */}
                        <div className="bg-gray-50 rounded-2xl p-4 mb-8">
                            <p className="text-sm text-gray-500 mb-2">등록된 이메일 힌트</p>
                            {emailHints.map((hint, index) => (
                                <p key={index} className="font-mono text-lg">
                                    {hint}
                                </p>
                            ))}
                        </div>

                        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일 전체 입력"
                                className="w-full px-6 py-4 bg-gray-50 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-black/10"
                                autoFocus
                            />
                            {errorMessage && (
                                <p className="text-red-500 text-sm">{errorMessage}</p>
                            )}
                            <button
                                type="submit"
                                className="w-full py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                            >
                                결과 보기
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        );
    }

    // 에러 화면
    if (step === 'error') {
        return (
            <main className="min-h-screen bg-white text-black">
                <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-xl font-medium tracking-tight">
                            Self Narrative
                        </Link>
                        <nav className="flex items-center gap-8">
                            <Link href="/" className="text-sm text-gray-600 hover:text-black transition-colors">
                                홈
                            </Link>
                        </nav>
                    </div>
                </header>

                <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
                    <div className="text-center max-w-md">
                        <h1 className="text-3xl font-light mb-4">
                            오류가 발생했습니다
                        </h1>
                        <p className="text-gray-600 mb-8">{errorMessage}</p>
                        <button
                            onClick={handleBack}
                            className="inline-block px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                        >
                            다시 시도하기
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    // 데이터 없음
    if (!reportData) {
        return null;
    }

    // 지인 응답이 없는 경우
    if (reportData.friendData.totalResponses < 1) {
        const userName = reportData.user.name;
        return (
            <main className="min-h-screen bg-white text-black">
                <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="text-xl font-medium tracking-tight">
                            Self Narrative
                        </Link>
                        <nav className="flex items-center gap-8">
                            <Link href="/" className="text-sm text-gray-600 hover:text-black transition-colors">
                                홈
                            </Link>
                        </nav>
                    </div>
                </header>

                <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
                    <div className="max-w-md text-center">
                        <h1 className="text-3xl font-light mb-4">
                            <span className="font-medium">{userName}</span>님,
                            <br />아직 지인 응답이 없어요
                        </h1>
                        <p className="text-gray-600 mb-8">
                            친구들에게 설문 링크를 공유하고
                            <br />응답을 기다려주세요
                        </p>
                        <Link
                            href={`/share?name=${encodeURIComponent(userName)}`}
                            className="inline-block px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                        >
                            지인에게 공유하기
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    // 결과 리포트 표시
    return (
        <main className="min-h-screen bg-white text-black">
            {/* 헤더 */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl font-medium tracking-tight">
                        Self Narrative
                    </Link>
                    <nav className="flex items-center gap-8">
                        <Link href="/" className="text-sm text-gray-600 hover:text-black transition-colors">
                            홈
                        </Link>
                        <Link
                            href={`/share?name=${encodeURIComponent(reportData.user.name)}`}
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                        >
                            공유하기
                        </Link>
                    </nav>
                </div>
            </header>

            {/* 메인 컨텐츠 */}
            <div className="pt-24 px-4 pb-20 space-y-16">
                {/* 섹션 1: 사용자 프로필 */}
                <section>
                    <UserProfileCard
                        user={reportData.user}
                        friendData={reportData.friendData}
                    />
                </section>

                {/* 섹션 2: 인식 격차 차트 */}
                <section>
                    <GapChart gaps={reportData.gaps} />
                </section>

                {/* 섹션 3: 지인 피드백 */}
                <section>
                    <FeedbackCarousel evaluations={reportData.friendEvaluations} />
                </section>

                {/* 최종 메시지 */}
                <section className="max-w-4xl mx-auto">
                    <div className="bg-gray-50 rounded-2xl p-8 text-center">
                        <h2 className="text-2xl font-medium mb-4">당신의 서사는 계속됩니다</h2>
                        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            {reportData.user.name}님, 지인들이 바라보는 당신은 생각보다 훨씬 빛나는 사람이에요.
                            때로는 스스로를 과소평가하기도 하지만, 주변 사람들은 당신의 가치를 알고 있답니다.
                        </p>
                    </div>
                </section>
            </div>

            {/* 푸터 */}
            <footer className="py-12 px-6 border-t border-gray-100">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © 2024 Self Narrative Project
                    </p>
                    <p className="text-sm text-gray-500">
                        당신이 몰랐던 당신의 진짜 이야기를 찾아서
                    </p>
                </div>
            </footer>
        </main>
    );
}

export default function ReportPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-gray-500">로딩 중...</div>
            </div>
        }>
            <ReportContent />
        </Suspense>
    );
}
