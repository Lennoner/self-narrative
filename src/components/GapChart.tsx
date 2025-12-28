'use client';

import { GapData } from '@/types';

interface GapChartProps {
    gaps: GapData[];
}

export default function GapChart({ gaps }: GapChartProps) {
    const categories = ['과거', '현재', '미래'];
    const categoryMeta: Record<string, { en: string; desc: string }> = {
        '과거': { en: 'Past', desc: '인지적 오류 교정' },
        '현재': { en: 'Present', desc: '사회적 가치 입증' },
        '미래': { en: 'Future', desc: '잠재역량 도출' },
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="mb-8">
                <p className="text-sm text-gray-500 mb-2 tracking-widest uppercase">Gap Analysis</p>
                <h2 className="text-2xl font-light">
                    <span className="font-medium">인식 격차</span> 분석
                </h2>
            </div>

            <div className="space-y-6">
                {categories.map((category) => {
                    const categoryGaps = gaps.filter((g) => g.category === category);

                    return (
                        <div key={category} className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex items-baseline gap-3 mb-6">
                                <h3 className="text-lg font-medium">{category}</h3>
                                <span className="text-sm text-gray-500">{categoryMeta[category].desc}</span>
                            </div>

                            <div className="space-y-5">
                                {categoryGaps.map((gap) => (
                                    <div key={`${gap.category}-${gap.label}`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium">{gap.label}</span>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="text-gray-500">
                                                    나 <span className="text-black font-medium">{gap.selfScore}</span>
                                                </span>
                                                <span className="text-gray-500">
                                                    지인 <span className="text-black font-medium">{gap.friendAvgScore.toFixed(1)}</span>
                                                </span>
                                                <span className={`font-medium ${gap.gap > 0 ? 'text-green-600' : gap.gap < 0 ? 'text-red-500' : 'text-gray-500'
                                                    }`}>
                                                    {gap.gap > 0 ? '+' : ''}{gap.gap.toFixed(1)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* 바 차트 */}
                                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-black rounded-full transition-all duration-500"
                                                style={{ width: `${(gap.selfScore / 5) * 100}%` }}
                                            />
                                        </div>
                                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-gray-400 rounded-full transition-all duration-500"
                                                style={{ width: `${(gap.friendAvgScore / 5) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 인사이트 */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    {getInsight(categoryGaps)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 범례 */}
            <div className="flex justify-center gap-8 mt-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-black rounded-full" />
                    <span className="text-gray-600">나의 평가</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full" />
                    <span className="text-gray-600">지인 평균</span>
                </div>
            </div>
        </div>
    );
}

function getInsight(gaps: GapData[]): string {
    const avgGap = gaps.reduce((sum, g) => sum + g.gap, 0) / gaps.length;
    const category = gaps[0]?.category || '';

    if (avgGap > 0.5) {
        return `지인들은 "${category}"에 대해 당신을 평균 ${avgGap.toFixed(1)}점 더 높이 평가합니다. 스스로 인지하지 못한 강점이 있을 수 있어요.`;
    } else if (avgGap < -0.5) {
        return `"${category}"에 대한 자기 평가가 지인들보다 높습니다. 이 차이에 대해 생각해보는 것도 좋겠어요.`;
    } else {
        return `"${category}"에서 자기 인식과 지인들의 시선이 거의 일치합니다. 균형 잡힌 자기 이해를 가지고 계시네요.`;
    }
}
