'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';

function ShareContent() {
    const searchParams = useSearchParams();
    const userName = searchParams.get('name') || '';

    const [copied, setCopied] = useState(false);
    const [isValidUser, setIsValidUser] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 설문 참여자인지 확인
    useEffect(() => {
        if (!userName) {
            setIsValidUser(false);
            setIsLoading(false);
            return;
        }

        const checkUser = async () => {
            try {
                const res = await fetch('/api/auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: userName, step: 'check-name' }),
                });
                const data = await res.json();
                setIsValidUser(data.found === true);
            } catch {
                setIsValidUser(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkUser();
    }, [userName]);

    // 지인용 설문 링크 (사용자 이름 포함)
    const friendSurveyLink = `https://tally.so/r/44BRVA?name=${encodeURIComponent(userName)}`;

    // 공유용 메시지
    const shareMessage = `안녕! 나 요즘 재밌는 프로젝트에 참여하고 있어. 나에 대해 솔직하게 평가해줄 수 있어? 익명이고 3분이면 끝나! 🙏\n\n${friendSurveyLink}`;

    // 클립보드 복사
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(friendSurveyLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('복사 실패:', err);
        }
    };

    // 메시지와 함께 복사
    const copyWithMessage = async () => {
        try {
            await navigator.clipboard.writeText(shareMessage);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('복사 실패:', err);
        }
    };

    // 공유 API
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: '나에 대해 솔직하게 평가해줘!',
                    text: shareMessage,
                    url: friendSurveyLink,
                });
            } catch (err) {
                console.log('공유 취소됨');
            }
        } else {
            copyWithMessage();
        }
    };

    // 로딩 중
    if (isLoading) {
        return (
            <main className="min-h-screen bg-white text-black flex items-center justify-center">
                <div className="text-center">
                    <div className="text-2xl font-light mb-4">확인 중...</div>
                    <p className="text-gray-500">잠시만 기다려주세요</p>
                </div>
            </main>
        );
    }

    // 설문 참여자가 아닌 경우
    if (!isValidUser) {
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
                            {userName ? (
                                <>
                                    <span className="font-medium">{userName}</span>님은
                                    <br />아직 설문에 참여하지 않았어요
                                </>
                            ) : (
                                '이름이 필요해요'
                            )}
                        </h1>
                        <p className="text-gray-600 mb-8">
                            먼저 설문에 참여해야 친구들에게 공유할 수 있어요
                        </p>
                        <a
                            href="https://tally.so/r/ODl9AK"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                        >
                            설문 시작하기 →
                        </a>
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
                        <Link
                            href="/"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                        >
                            홈
                        </Link>
                        <Link
                            href="/report"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                        >
                            결과보기
                        </Link>
                    </nav>
                </div>
            </header>

            {/* 메인 컨텐츠 */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
                <div className="max-w-lg w-full text-center">
                    {/* 완료 메시지 */}
                    <div className="mb-12">
                        <p className="text-sm text-gray-500 mb-6 tracking-widest uppercase">
                            Survey Complete
                        </p>
                        <h1 className="text-3xl md:text-4xl font-light leading-tight mb-4">
                            <span className="font-medium">{userName}</span>님,
                            <br />설문이 완료되었습니다
                        </h1>
                        <p className="text-gray-600">
                            이제 친구들에게 공유할 차례예요
                        </p>
                    </div>

                    {/* 안내 박스 */}
                    <div className="bg-gray-50 rounded-2xl p-8 mb-8 text-left">
                        <h2 className="text-lg font-medium mb-4">
                            친구들의 시선이 필요해요
                        </h2>
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                            최소 <span className="font-medium text-black">3명</span> 이상의 친구가 응답해야
                            의미 있는 인식 격차 리포트가 완성됩니다.
                        </p>

                        {/* 링크 표시 */}
                        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
                            <p className="text-xs text-gray-500 mb-2">지인용 설문 링크</p>
                            <p className="text-sm text-gray-700 break-all">{friendSurveyLink}</p>
                        </div>

                        {/* 버튼들 */}
                        <div className="space-y-3">
                            <button
                                onClick={copyToClipboard}
                                className={`w-full py-4 rounded-full text-sm font-medium transition-all ${copied
                                    ? 'bg-black text-white'
                                    : 'bg-black text-white hover:bg-gray-800'
                                    }`}
                            >
                                {copied ? '✓ 복사 완료' : '링크 복사하기'}
                            </button>

                            <button
                                onClick={copyWithMessage}
                                className="w-full py-4 bg-white text-black rounded-full text-sm font-medium border border-gray-200 hover:border-gray-400 transition-colors"
                            >
                                메시지와 함께 복사
                            </button>

                            <button
                                onClick={handleShare}
                                className="w-full py-4 bg-white text-black rounded-full text-sm font-medium border border-gray-200 hover:border-gray-400 transition-colors"
                            >
                                공유하기
                            </button>
                        </div>
                    </div>

                    {/* 팁 */}
                    <div className="text-left text-sm text-gray-500 mb-12">
                        <p className="font-medium text-gray-700 mb-2">공유 팁</p>
                        <ul className="space-y-1">
                            <li>• 가까운 친구, 가족, 동료에게 부탁해보세요</li>
                            <li>• 다양한 관계의 사람들이 응답할수록 풍부한 리포트가 됩니다</li>
                            <li>• 모든 응답은 익명으로 처리됩니다</li>
                        </ul>
                    </div>

                    {/* 하단 링크 */}
                    <div className="flex justify-center gap-8 text-sm">
                        <Link
                            href="/"
                            className="text-gray-500 hover:text-black transition-colors"
                        >
                            ← 홈으로
                        </Link>
                        <Link
                            href={`/report?name=${encodeURIComponent(userName)}`}
                            className="text-gray-500 hover:text-black transition-colors"
                        >
                            내 결과 보기 →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default function SharePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-gray-500">로딩 중...</div>
            </div>
        }>
            <ShareContent />
        </Suspense>
    );
}
