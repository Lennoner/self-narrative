import Link from 'next/link';
import { getReportData } from '@/lib/reportService';
import { getAllUserNames } from '@/lib/googleSheets';
import UserProfileCard from '@/components/UserProfileCard';
import GapChart from '@/components/GapChart';
import FeedbackCarousel from '@/components/FeedbackCarousel';

interface ReportPageProps {
    searchParams: Promise<{ name?: string }>;
}

export default async function ReportPage({ searchParams }: ReportPageProps) {
    const params = await searchParams;
    const userName = params.name;

    // 사용자 이름이 없으면 검색 화면 표시
    if (!userName) {
        const userNames = await getAllUserNames();

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
                        <h1 className="text-3xl font-light mb-8">
                            <span className="font-medium">결과</span> 조회
                        </h1>
                        <p className="text-gray-600 mb-8">
                            설문에 참여하신 분의 이름을 선택해주세요
                        </p>

                        {/* 사용자 목록 */}
                        <div className="space-y-3">
                            {userNames.length > 0 ? (
                                userNames.map((name) => (
                                    <Link
                                        key={name}
                                        href={`/report?name=${encodeURIComponent(name)}`}
                                        className="block w-full py-4 px-6 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors"
                                    >
                                        <span className="font-medium">{name}</span>
                                        <span className="text-gray-400 text-sm ml-2">→</span>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-500">아직 설문 데이터가 없습니다.</p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    // 리포트 데이터 가져오기
    const reportData = await getReportData(userName);

    // 데이터가 없으면 에러 화면
    if (!reportData) {
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
                            <Link href="/report" className="text-sm text-gray-600 hover:text-black transition-colors">
                                다른 결과 보기
                            </Link>
                        </nav>
                    </div>
                </header>

                <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
                    <div className="text-center">
                        <h1 className="text-3xl font-light mb-4">
                            <span className="font-medium">{userName}</span>님의 결과를 찾을 수 없습니다
                        </h1>
                        <p className="text-gray-600 mb-8">
                            설문에 참여하셨는지 확인해주세요
                        </p>
                        <Link
                            href="/report"
                            className="inline-block px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                        >
                            다른 결과 조회하기
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    // 지인 응답이 부족한 경우
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
                        <Link href="/report" className="text-sm text-gray-600 hover:text-black transition-colors">
                            다른 결과 보기
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
