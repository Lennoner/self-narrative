'use client';

import { UserSelfData, FriendAggregatedData } from '@/types';

interface UserProfileCardProps {
    user: UserSelfData;
    friendData: FriendAggregatedData;
}

// 심리 상태를 이모지와 텍스트로 변환
function getMoodDisplay(score: number): { emoji: string; text: string; color: string } {
    if (score >= 5) return { emoji: '😄', text: '매우 좋음', color: 'text-green-500' };
    if (score >= 4) return { emoji: '😊', text: '좋음', color: 'text-green-400' };
    if (score >= 3) return { emoji: '😐', text: '보통', color: 'text-yellow-500' };
    if (score >= 2) return { emoji: '😔', text: '낮음', color: 'text-orange-400' };
    return { emoji: '😢', text: '매우 낮음', color: 'text-red-400' };
}

export default function UserProfileCard({ user, friendData }: UserProfileCardProps) {
    const mood = getMoodDisplay(user.baselineScore);

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* 헤더 카드 */}
            <div className="bg-black rounded-2xl p-8 text-white mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* 이름 */}
                    <div>
                        <p className="text-sm text-gray-400 mb-2 tracking-widest uppercase">Report</p>
                        <h1 className="text-3xl md:text-4xl font-light">
                            <span className="font-medium">{user.name}</span>님의 자아 서사
                        </h1>
                    </div>

                    {/* 리포트 요약 정보 */}
                    <div className="flex gap-6">
                        <div className="text-center px-4 py-2 bg-white/10 rounded-xl">
                            <p className="text-2xl font-light">{friendData.totalResponses}명</p>
                            <p className="text-xs text-gray-400 mt-1">지인 응답</p>
                        </div>
                        <div className="text-center px-4 py-2 bg-white/10 rounded-xl">
                            <p className="text-2xl font-light">6개</p>
                            <p className="text-xs text-gray-400 mt-1">분석 항목</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 심리 상태 카드 - 별도 분리 */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4">
                    <div className="text-5xl">{mood.emoji}</div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">현재 심리 상태</p>
                        <p className={`text-xl font-medium ${mood.color}`}>
                            {mood.text}
                            <span className="text-gray-400 font-normal text-sm ml-2">
                                ({user.baselineScore}/5)
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* 사용자 응답 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 과거 */}
                <div className="bg-gray-50 rounded-2xl p-6">
                    <p className="text-xs text-gray-500 mb-1 tracking-widest uppercase">Past</p>
                    <h3 className="font-medium mb-3">과거</h3>
                    <p className="text-sm text-gray-500 mb-2">가장 에너지 넘쳤던 순간</p>
                    <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{user.past.text}&rdquo;</p>
                </div>

                {/* 현재 */}
                <div className="bg-gray-50 rounded-2xl p-6">
                    <p className="text-xs text-gray-500 mb-1 tracking-widest uppercase">Present</p>
                    <h3 className="font-medium mb-3">현재</h3>
                    <p className="text-sm text-gray-500 mb-2">나를 찾는 이유</p>
                    <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{user.present.text}&rdquo;</p>
                </div>

                {/* 미래 */}
                <div className="bg-gray-50 rounded-2xl p-6">
                    <p className="text-xs text-gray-500 mb-1 tracking-widest uppercase">Future</p>
                    <h3 className="font-medium mb-3">미래</h3>
                    <p className="text-sm text-gray-500 mb-2">3년 뒤 기대되는 모습</p>
                    <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{user.future.text}&rdquo;</p>
                </div>
            </div>
        </div>
    );
}
