'use client';

import { FriendEvaluation } from '@/types';
import { useState } from 'react';

interface FeedbackCarouselProps {
    evaluations: FriendEvaluation[];
}

type TimeCategory = 'past' | 'present' | 'future';

export default function FeedbackCarousel({ evaluations }: FeedbackCarouselProps) {
    const [activeCategory, setActiveCategory] = useState<TimeCategory>('present');

    const categoryConfig: Record<TimeCategory, { label: string; en: string; description: string }> = {
        past: { label: '과거', en: 'Past', description: '가장 빛났던 순간' },
        present: { label: '현재', en: 'Present', description: '지금의 가치' },
        future: { label: '미래', en: 'Future', description: '기대되는 모습' },
    };

    const getFeedbackText = (evaluation: FriendEvaluation, category: TimeCategory): string => {
        return evaluation[category].text;
    };

    const getSelection = (evaluation: FriendEvaluation, category: TimeCategory): string => {
        return evaluation[category].selection;
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="mb-6">
                <p className="text-xs text-gray-400 mb-2 tracking-widest uppercase">Qualitative Feedback</p>
                <h2 className="text-xl md:text-2xl font-light">
                    <span className="font-semibold">지인들의 목소리</span>
                </h2>
                <p className="text-xs text-gray-500 mt-2">
                    {evaluations.length}명의 지인이 응답했습니다
                </p>
            </div>

            {/* 카테고리 탭 */}
            <div className="flex gap-2 mb-6">
                {(Object.keys(categoryConfig) as TimeCategory[]).map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {categoryConfig[category].label}
                    </button>
                ))}
            </div>

            {/* 피드백 카드들 */}
            <div className="space-y-3">
                {evaluations.map((evaluation, index) => {
                    const feedbackText = getFeedbackText(evaluation, activeCategory);
                    const selection = getSelection(evaluation, activeCategory);

                    return (
                        <div
                            key={evaluation.submissionId}
                            className="bg-gray-50 rounded-2xl p-5"
                        >
                            {/* 선택 응답 */}
                            <p className="text-xs text-gray-500 mb-2">{selection}</p>

                            {/* 피드백 텍스트 */}
                            <blockquote className="text-sm text-gray-700 leading-relaxed">
                                &ldquo;{feedbackText}&rdquo;
                            </blockquote>

                            {/* 익명 표시 */}
                            <div className="mt-3 flex items-center gap-2 text-gray-400 text-xs">
                                <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs">
                                    {index + 1}
                                </div>
                                <span>익명</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 요약 */}
            <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                    {categoryConfig[activeCategory].description}에 대한 지인들의 이야기
                </p>
            </div>
        </div>
    );
}
