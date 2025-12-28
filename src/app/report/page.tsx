import Link from 'next/link';
import { LEE_ONYU_REPORT_DATA } from '@/data/dummyData';
import UserProfileCard from '@/components/UserProfileCard';
import GapChart from '@/components/GapChart';
import FeedbackCarousel from '@/components/FeedbackCarousel';

export default function ReportPage() {
    // 현재는 더미 데이터 사용 (나중에 동적 라우팅으로 변경)
    const reportData = LEE_ONYU_REPORT_DATA;

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
