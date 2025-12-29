'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ShareLinkPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsLoading(true);
        setError('');

        try {
            // 사용자 존재 여부 확인
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), step: 'check-name' }),
            });

            const data = await response.json();

            if (data.found) {
                // 사용자 존재 → 공유 페이지로 이동
                router.push(`/share?name=${encodeURIComponent(name.trim())}`);
            } else {
                // 사용자 없음 → 에러 메시지
                setError('해당 이름으로 설문에 참여한 기록이 없습니다. 먼저 설문에 참여해주세요.');
                setIsLoading(false);
            }
        } catch {
            setError('오류가 발생했습니다. 다시 시도해주세요.');
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white text-black">
            {/* 헤더 */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="text-lg md:text-xl font-semibold tracking-tight hover:opacity-70 transition-opacity">
                        Self Narrative
                    </Link>
                    <nav className="flex items-center gap-6 md:gap-8">
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

            {/* 메인 컨텐츠 */}
            <section className="min-h-screen flex flex-col items-center justify-center px-5 md:px-8 pt-20">
                <div className="max-w-md w-full text-center">
                    <p className="text-xs text-gray-400 mb-4 tracking-widest uppercase">
                        Share with Friends
                    </p>
                    <h1 className="text-2xl md:text-3xl font-light mb-3">
                        <span className="font-semibold">친구들에게</span> 공유하기
                    </h1>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                        설문을 완료하셨나요? 🎉<br />
                        이름을 입력하고 친구들에게 공유 링크를 보내세요.<br />
                        최소 2명만 응답해도 리포트가 완성됩니다!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError('');
                            }}
                            placeholder="설문에 참여한 이름 입력"
                            disabled={isLoading}
                            className="w-full px-5 py-4 bg-gray-50 rounded-full text-center text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all disabled:opacity-50"
                        />

                        {error && (
                            <div className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !name.trim()}
                            className="w-full py-4 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? '확인 중...' : '공유 링크 받기 →'}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-gray-100">
                        <p className="text-xs text-gray-400 mb-3">아직 설문에 참여하지 않았나요?</p>
                        <a
                            href="https://tally.so/r/ODl9AK"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-black underline hover:no-underline"
                        >
                            설문 시작하기 →
                        </a>
                    </div>
                </div>
            </section>

            {/* 푸터 */}
            <footer className="py-10 px-5 md:px-8 border-t border-gray-100">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-xs text-gray-400">
                        © 2025 Self Narrative Project
                    </p>
                    <p className="text-xs text-gray-400">
                        당신이 몰랐던 당신의 진짜 이야기를 찾아서
                    </p>
                </div>
            </footer>
        </main>
    );
}
