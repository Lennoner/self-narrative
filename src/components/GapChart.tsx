'use client';

import { GapData } from '@/types';

interface GapChartProps {
    gaps: GapData[];
}

// 라벨을 질문으로 매핑
const labelToQuestion: Record<string, string> = {
    '극복력': '어려운 상황을 내 힘으로 극복해본 적 있다',
    '자부심': '내 성과에 대해 자부심을 느낀다',
    '영향력': '주변 사람들에게 긍정적 영향을 주고 있다',
    '필요성': '내가 속한 그룹에서 꼭 필요한 사람이다',
    '잠재력': '나만의 가치를 증명할 잠재력이 충분하다',
    '성장기대': '3년 뒤 더 나다운 삶을 살고 있을 것이다',
};

export default function GapChart({ gaps }: GapChartProps) {
    const categories = ['과거', '현재', '미래'];
    const categoryMeta: Record<string, { en: string; desc: string }> = {
        '과거': { en: 'Past', desc: '인지적 오류 교정' },
        '현재': { en: 'Present', desc: '사회적 가치 입증' },
        '미래': { en: 'Future', desc: '잠재역량 도출' },
    };

    // 전체 평균 격차 계산
    const avgGap = gaps.reduce((sum, g) => sum + g.gap, 0) / gaps.length;
    const maxGap = Math.max(...gaps.map(g => g.gap));
    const minGap = Math.min(...gaps.map(g => g.gap));

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="mb-6">
                <p className="text-xs text-gray-400 mb-2 tracking-widest uppercase">Gap Analysis</p>
                <h2 className="text-xl md:text-2xl font-light">
                    <span className="font-semibold">인식 격차</span> 분석
                </h2>
            </div>

            {/* 전체 요약 */}
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-5 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">전체 평균 격차</p>
                        <p className="text-xl font-semibold">
                            {avgGap > 0 ? (
                                <span className="text-green-600">+{avgGap.toFixed(2)}점</span>
                            ) : avgGap < 0 ? (
                                <span className="text-red-500">{avgGap.toFixed(2)}점</span>
                            ) : (
                                <span className="text-gray-600">0점</span>
                            )}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {avgGap > 0
                                ? '지인들이 당신을 더 높이 평가하고 있어요 💪'
                                : avgGap < 0
                                    ? '자기 평가가 지인보다 높은 편이에요'
                                    : '자기 인식과 지인 평가가 일치해요'}
                        </p>
                    </div>
                    <div className="flex gap-4 text-center">
                        <div>
                            <p className="text-xs text-gray-500">최대</p>
                            <p className={`text-base font-semibold ${maxGap > 0 ? 'text-green-600' : 'text-gray-600'}`}>
                                {maxGap > 0 ? '+' : ''}{maxGap.toFixed(1)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">최소</p>
                            <p className={`text-base font-semibold ${minGap < 0 ? 'text-red-500' : 'text-gray-600'}`}>
                                {minGap > 0 ? '+' : ''}{minGap.toFixed(1)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {categories.map((category) => {
                    const categoryGaps = gaps.filter((g) => g.category === category);

                    return (
                        <div key={category} className="bg-gray-50 rounded-2xl p-5">
                            <div className="flex items-baseline gap-2 mb-4">
                                <h3 className="text-base font-semibold">{category}</h3>
                                <span className="text-xs text-gray-500">{categoryMeta[category].desc}</span>
                            </div>

                            <div className="space-y-4">
                                {categoryGaps.map((gap) => (
                                    <div key={`${gap.category}-${gap.label}`}>
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                                            <span className="text-xs md:text-sm text-gray-700">
                                                {labelToQuestion[gap.label] || gap.label}
                                            </span>
                                            <div className="flex items-center gap-3 text-xs">
                                                <span className="flex items-center gap-1">
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                    <span className="text-gray-500">나</span>
                                                    <span className="text-blue-600 font-medium">{gap.selfScore}</span>
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                                                    <span className="text-gray-500">지인</span>
                                                    <span className="text-orange-500 font-medium">{gap.friendAvgScore.toFixed(1)}</span>
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${gap.gap > 0
                                                        ? 'bg-green-100 text-green-700'
                                                        : gap.gap < 0
                                                            ? 'bg-red-100 text-red-600'
                                                            : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {gap.gap > 0 ? '+' : ''}{gap.gap.toFixed(1)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* 바 차트 */}
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-400 w-6">나</span>
                                                <div className="flex-1 relative h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-500"
                                                        style={{ width: `${(gap.selfScore / 5) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-400 w-6">지인</span>
                                                <div className="flex-1 relative h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="absolute top-0 left-0 h-full bg-orange-400 rounded-full transition-all duration-500"
                                                        style={{ width: `${(gap.friendAvgScore / 5) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 인사이트 */}
                            <div className="mt-4 pt-3 border-t border-gray-200">
                                <p className="text-xs text-gray-500">
                                    {getInsight(categoryGaps)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 범례 */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 text-xs">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-500">나의 평가</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full" />
                    <span className="text-gray-500">지인 평균</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">+</span>
                    <span className="text-gray-500">지인이 더 높이 평가</span>
                </div>
            </div>
        </div>
    );
}

function getInsight(gaps: GapData[]): string {
    const avgGap = gaps.reduce((sum, g) => sum + g.gap, 0) / gaps.length;
    const category = gaps[0]?.category || '';

    if (avgGap > 0.5) {
        return `💡 지인들은 "${category}"에서 당신을 평균 ${avgGap.toFixed(1)}점 더 높이 평가합니다.`;
    } else if (avgGap < -0.5) {
        return `🤔 "${category}"에 대한 자기 평가가 지인들보다 높습니다.`;
    } else {
        return `✨ "${category}"에서 자기 인식과 지인들의 시선이 거의 일치합니다.`;
    }
}
