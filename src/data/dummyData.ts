// 홍길동 더미 데이터 (데모용 익명화된 샘플)

import { UserSelfData, FriendEvaluation, FriendAggregatedData, GapData, ReportData } from '@/types';

// 홍길동 사용자 자가 진단 데이터
export const DEMO_SELF_DATA: UserSelfData = {
    name: '홍길동',
    email: 'demo@example.com',
    submissionId: 'demo001',
    submissionDate: '2025년 12월 26일',
    baselineScore: 4,

    past: {
        score1: 4,
        score2: 4,
        selection: '운이 좋았거나 시기가 잘 맞았다.',
        text: '대학교 시절 동아리 활동과 프로젝트를 진행했던 때',
    },

    present: {
        score1: 5,
        score2: 4,
        selection: '나를 대체할 수 없는 공백이 생길 것이다.',
        text: '주변 사람들에게 도움을 주려고 노력하는 모습',
    },

    future: {
        score1: 5,
        score2: 5,
        selection: '새로운 가치를 만드는 창의와 도전 영역',
        text: '새로운 분야에서 창업 성공',
    },
};

// 홍길동에 대한 지인 평가 개별 데이터 (4명)
export const DEMO_FRIEND_EVALUATIONS: FriendEvaluation[] = [
    {
        submissionId: 'friend001',
        submissionDate: '2025년 12월 26일',
        targetUser: '홍길동',
        past: {
            score1: 5,
            score2: 5,
            selection: '이 친구만의 고유한 노력과 역량이 발휘된 결과다.',
            text: '적극적인 마인드와 도전정신, 항상 최선을 다하는 모습',
        },
        present: {
            score1: 5,
            score2: 5,
            selection: '이 친구만이 채워줄 수 있었던 고유한 공백과 상실감이 클 것이다.',
            text: '상대방을 이해하고 수용하려는 노력, 긍정적인 에너지',
        },
        future: {
            score1: 5,
            score2: 5,
            selection: '새로운 가치를 만드는 창의와 도전 영역',
            text: '끊임없이 도전하고 노력하는 성장하는 모습',
        },
    },
    {
        submissionId: 'friend002',
        submissionDate: '2025년 12월 27일',
        targetUser: '홍길동',
        past: {
            score1: 4,
            score2: 4,
            selection: '이 친구만의 고유한 노력과 역량이 발휘된 결과다.',
            text: '미래에 대한 비전과 계획을 이야기할 때 빛나는 모습',
        },
        present: {
            score1: 4,
            score2: 4,
            selection: '이 친구만이 채워줄 수 있었던 고유한 공백과 상실감이 클 것이다.',
            text: '언제나 진심으로 대해주고 필요할 때 곁에 있어줘서 고마워요',
        },
        future: {
            score1: 4,
            score2: 5,
            selection: '공동체를 단단하게 이끄는 리더십·책임 영역',
            text: '자신이 하는 일에 대한 확신과 더 나은 방향을 고민하는 모습',
        },
    },
    {
        submissionId: 'friend003',
        submissionDate: '2025년 12월 27일',
        targetUser: '홍길동',
        past: {
            score1: 5,
            score2: 5,
            selection: '이 친구만의 고유한 노력과 역량이 발휘된 결과다.',
            text: '좋아하는 일에 진심으로 몰입하고, 주변 사람들을 도울 때 빛나는 모습',
        },
        present: {
            score1: 5,
            score2: 5,
            selection: '이 친구만이 채워줄 수 있었던 고유한 공백과 상실감이 클 것이다.',
            text: '항상 밝고 긍정적인 에너지로 주변을 환하게 해줘서 감사해요',
        },
        future: {
            score1: 5,
            score2: 5,
            selection: '현상을 읽고 전략을 짜는 논리·분석 영역',
            text: '차근차근 단계를 밟아 꿈을 향해 전진하고 있을 모습이 기대돼요',
        },
    },
    {
        submissionId: 'friend004',
        submissionDate: '2025년 12월 27일',
        targetUser: '홍길동',
        past: {
            score1: 5,
            score2: 5,
            selection: '이 친구만의 고유한 노력과 역량이 발휘된 결과다.',
            text: '어려운 상황에서도 묵묵히 자기 할 일을 하던 모습이 인상적',
        },
        present: {
            score1: 4,
            score2: 5,
            selection: '이 친구만이 채워줄 수 있었던 고유한 공백과 상실감이 클 것이다.',
            text: '따뜻하고 배려심 깊은 성격으로 함께하면 편안해요',
        },
        future: {
            score1: 5,
            score2: 5,
            selection: '새로운 가치를 만드는 창의와 도전 영역',
            text: '소신을 잃지 않고 자신감 있게 나아가는 모습이 기대돼요',
        },
    },
];

// 지인 평가 집계 데이터 계산
function calculateAggregatedData(evaluations: FriendEvaluation[]): FriendAggregatedData {
    const n = evaluations.length;

    return {
        pastScore1Avg: evaluations.reduce((sum, e) => sum + e.past.score1, 0) / n,
        pastScore2Avg: evaluations.reduce((sum, e) => sum + e.past.score2, 0) / n,
        pastTexts: evaluations.map(e => e.past.text),

        presentScore1Avg: evaluations.reduce((sum, e) => sum + e.present.score1, 0) / n,
        presentScore2Avg: evaluations.reduce((sum, e) => sum + e.present.score2, 0) / n,
        presentTexts: evaluations.map(e => e.present.text),

        futureScore1Avg: evaluations.reduce((sum, e) => sum + e.future.score1, 0) / n,
        futureScore2Avg: evaluations.reduce((sum, e) => sum + e.future.score2, 0) / n,
        futureTexts: evaluations.map(e => e.future.text),

        totalResponses: n,
    };
}

// 인식 격차 계산
function calculateGaps(user: UserSelfData, friendData: FriendAggregatedData): GapData[] {
    return [
        {
            category: '과거',
            dimension: 'score1',
            label: '극복력',
            selfScore: user.past.score1,
            friendAvgScore: friendData.pastScore1Avg,
            gap: Number((friendData.pastScore1Avg - user.past.score1).toFixed(2)),
        },
        {
            category: '과거',
            dimension: 'score2',
            label: '자부심',
            selfScore: user.past.score2,
            friendAvgScore: friendData.pastScore2Avg,
            gap: Number((friendData.pastScore2Avg - user.past.score2).toFixed(2)),
        },
        {
            category: '현재',
            dimension: 'score1',
            label: '영향력',
            selfScore: user.present.score1,
            friendAvgScore: friendData.presentScore1Avg,
            gap: Number((friendData.presentScore1Avg - user.present.score1).toFixed(2)),
        },
        {
            category: '현재',
            dimension: 'score2',
            label: '필요성',
            selfScore: user.present.score2,
            friendAvgScore: friendData.presentScore2Avg,
            gap: Number((friendData.presentScore2Avg - user.present.score2).toFixed(2)),
        },
        {
            category: '미래',
            dimension: 'score1',
            label: '잠재력',
            selfScore: user.future.score1,
            friendAvgScore: friendData.futureScore1Avg,
            gap: Number((friendData.futureScore1Avg - user.future.score1).toFixed(2)),
        },
        {
            category: '미래',
            dimension: 'score2',
            label: '성장기대',
            selfScore: user.future.score2,
            friendAvgScore: friendData.futureScore2Avg,
            gap: Number((friendData.futureScore2Avg - user.future.score2).toFixed(2)),
        },
    ];
}

// 홍길동 전체 리포트 데이터 (데모용)
export const LEE_ONYU_REPORT_DATA: ReportData = (() => {
    const friendData = calculateAggregatedData(DEMO_FRIEND_EVALUATIONS);
    return {
        user: DEMO_SELF_DATA,
        friendData,
        gaps: calculateGaps(DEMO_SELF_DATA, friendData),
        friendEvaluations: DEMO_FRIEND_EVALUATIONS,
    };
})();

// 유저 이름으로 데이터 조회 (나중에 실제 API로 대체)
export function getReportDataByName(name: string): ReportData | null {
    if (name === '홍길동' || name === '이온유') {
        return LEE_ONYU_REPORT_DATA;
    }
    return null;
}
