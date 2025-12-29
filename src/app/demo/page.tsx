import Link from 'next/link';
import UserProfileCard from '@/components/UserProfileCard';
import GapChart from '@/components/GapChart';
import FeedbackCarousel from '@/components/FeedbackCarousel';
import { LEE_ONYU_REPORT_DATA } from '@/data/dummyData';

export default function DemoPage() {
    const reportData = LEE_ONYU_REPORT_DATA;

    return (
        <main className="min-h-screen bg-white text-black">
            {/* 헤더 */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-semibold tracking-tight hover:opacity-70 transition-opacity">
                        Self Narrative
                    </Link>
                    <nav className="flex items-center gap-10">
                        <Link href="/" className="text-base text-gray-600 hover:text-black transition-colors">
                            홈
                        </Link>
                        <a
                            href="https://tally.so/r/ODl9AK"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base text-gray-600 hover:text-black transition-colors"
                        >
                            설문하기
                        </a>
                    </nav>
                </div>
            </header>

            {/* 데모 안내 배너 */}
            <div className="fixed top-[68px] left-0 right-0 z-40 bg-gray-900 text-white text-center py-3 text-base">
                📊 데모 리포트입니다. 실제 결과는 설문 참여 후 확인할 수 있습니다.
            </div>

            {/* 메인 컨텐츠 */}
            <div className="pt-40 px-8 pb-24 space-y-24">
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

                {/* CTA 메시지 */}
                <section className="max-w-5xl mx-auto">
                    <div className="bg-black rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-6">나만의 리포트를 받아보세요</h2>
                        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
                            이것은 데모 리포트입니다. 지금 설문에 참여하고 친구들에게 공유하면,
                            당신만의 인식 격차 리포트를 받아볼 수 있어요.
                        </p>
                        <a
                            href="https://tally.so/r/ODl9AK"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-12 py-5 bg-white text-black text-lg rounded-full font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-300"
                        >
                            나의 서사 찾기 →
                        </a>
                    </div>
                </section>
            </div>

            {/* 푸터 */}
            <footer className="py-16 px-8 border-t border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-base text-gray-400">
                        © 2024 Self Narrative Project
                    </p>
                    <p className="text-base text-gray-400">
                        당신이 몰랐던 당신의 진짜 이야기를 찾아서
                    </p>
                </div>
            </footer>
        </main>
    );
}
