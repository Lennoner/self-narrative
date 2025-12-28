'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserProfileCard from '@/components/UserProfileCard';
import GapChart from '@/components/GapChart';
import FeedbackCarousel from '@/components/FeedbackCarousel';
import { ReportData } from '@/types';

function ReportContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const userName = searchParams.get('name');

    const [searchName, setSearchName] = useState('');
    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userName) {
            setLoading(true);
            setError(null);

            fetch(`/api/report?name=${encodeURIComponent(userName)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setError(data.error);
                        setReportData(null);
                    } else {
                        setReportData(data);
                    }
                })
                .catch(() => {
                    setError('데이터를 불러오는데 실패했습니다.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [userName]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchName.trim()) {
            router.push(`/report?name=${encodeURIComponent(searchName.trim())}`);
        }
    };

    // 이름이 없으면 검색 화면 표시
    if (!userName) {
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
                        <p className="text-sm text-gray-500 mb-4 tracking-widest uppercase">
                            Report
                        </p>
                        <h1 className="text-3xl font-light mb-4">
                            <span className="font-medium">내 결과</span> 보기
                        </h1>
                        <p className="text-gray-600 mb-8">
                            설문에 참여하신 분의 이름을 입력해주세요
                        </p>

                        <form onSubmit={handleSearch} className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                placeholder="이름 입력"
                                className="w-full px-6 py-4 bg-gray-50 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-black/10"
                            />
                            <button
                                type="submit"
                                className="w-full py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                            >
                                결과 보기
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

    // 로딩 중
    if (loading) {
        return (
            <main className="min-h-screen bg-white text-black flex items-center justify-center">
                <div className="text-center">
                    <div className="text-2xl font-light mb-4">로딩 중...</div>
                    <p className="text-gray-500">잠시만 기다려주세요</p>
                </div>
            </main>
        );
    }

    // 에러 (사용자 없음)
    if (error) {
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
                            <span className="font-medium">{userName}</span>님의
                            <br />결과를 찾을 수 없습니다
                        </h1>
                        <p className="text-gray-600 mb-8">
                            설문에 참여하셨는지 확인해주세요.
                            <br />이름은 정확히 입력해야 합니다.
                        </p>
                        <Link
                            href="/report"
                            className="inline-block px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                        >
                            다시 검색하기
                        </Link>
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
                            href={`/share?name=${encodeURIComponent(userName)}`}
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
