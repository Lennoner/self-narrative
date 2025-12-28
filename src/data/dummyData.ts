// 이온유 더미 데이터 (예시 데이터 기반)

import { UserSelfData, FriendEvaluation, FriendAggregatedData, GapData, ReportData } from '@/types';

// 이온유 사용자 자가 진단 데이터
export const LEE_ONYU_SELF_DATA: UserSelfData = {
    name: '이온유',
    email: 'onyulee4025@naver.com',
    submissionId: 'gDPk78J',
    submissionDate: '2025년 12월 26일 오후 7:16 (UTC)',
    baselineScore: 4,

    past: {
        score1: 4,
        score2: 4,
        selection: '운이 좋았거나 시기가 잘 맞았다.',
        text: '고등학생 시절, 그리고 군대 전역 후',
    },

    present: {
        score1: 5,
        score2: 4,
        selection: '나를 대체할 수 없는 공백이 생길 것이다.',
        text: '내가 도움을 줄려고 노력하는 모습.',
    },

    future: {
        score1: 5,
        score2: 5,
        selection: '새로운 가치를 만드는 창의와 도전 영역',
        text: '심리 관련 창업 성공',
    },
};

// 이온유에 대한 지인 평가 개별 데이터 (4명)
export const LEE_ONYU_FRIEND_EVALUATIONS: FriendEvaluation[] = [
    {
        submissionId: 'obNkNYM',
        submissionDate: '2025년 12월 26일 오후 9:31 (UTC)',
        targetUser: '이온유',
        past: {
            score1: 5,
            score2: 5,
            selection: '이 친구만의 고유한 노력과 역량이 발휘된 결과다.',
            text: '적극적인 마인드\n도전정신\n최선을 다하는 모습',
        },
        present: {
            score1: 5,
            score2: 5,
            selection: '이 친구만이 채워줄 수 있었던 고유한 공백과 상실감이 클 것이다.',
            text: '상대방을 이해하고 수용하려는 노력\n긍정 에너지',
        },
        future: {
            score1: 5,
            score2: 5,
            selection: '새로운 가치를 만드는 창의와 도전 영역',
            text: '노력하고 도전하는 모습',
        },
    },
    {
        submissionId: 'ZjkDJxo',
        submissionDate: '2025년 12월 27일 오전 1:22 (UTC)',
        targetUser: '이온유',
        past: {
            score1: 4,
            score2: 4,
            selection: '이 친구만의 고유한 노력과 역량이 발휘된 결과다.',
            text: '미래의 프로젝트 이야기를 할 때',
        },
        present: {
            score1: 4,
            score2: 4,
            selection: '이 친구만이 채워줄 수 있었던 고유한 공백과 상실감이 클 것이다.',
            text: '여러사람이 있는 자리가 아닌 개인적인 자리에서도 궁금한 것을 들고 찾아와줘서 감사합니다. 방문이 후회되지 않고 보람찬 이유가 되어주셨습니다.',
        },
        future: {
            score1: 4,
            score2: 5,
            selection: '공동체를 단단하게 이끄는 리더십·책임 영역',
            text: '자신이 하는 일이 의미가 있을 것이라는 확신과 더 나은 개발을 위한 자가회의',
        },
    },
    {
        submissionId: '680MQYA',
        submissionDate: '2025년 12월 27일 오전 2:05 (UTC)',
        targetUser: '이온유',
        past: {
            score1: 5,
            score2: 5,
            selection: '이 친구만의 고유한 노력과 역량이 발휘된 결과다.',
            text: '거침없이 무대에 서는모습, 좋아하는 축구에 진심일때,\n군생활이 힘든 동생에게 엄청난 도움을 줄때\n때론 품어져나오는 지식의 모습을 발견할때입니다',
        },
        present: {
            score1: 5,
            score2: 5,
            selection: '이 친구만이 채워줄 수 있었던 고유한 공백과 상실감이 클 것이다.',
            text: '바르게 아름답게 잘 성장해준것에 감사합니다',
        },
        future: {
            score1: 5,
            score2: 5,
            selection: '현상을 읽고 전략을 짜는 논리·분석 영역',
            text: '다 이룬것보다 차근차근 단계를밟아 전진하고 있을 모습을 기대합니다',
        },
    },
    {
        submissionId: 'MeZMgrk',
        submissionDate: '2025년 12월 27일 오전 3:51 (UTC)',
        targetUser: '이온유',
        past: {
            score1: 5,
            score2: 5,
            selection: '이 친구만의 고유한 노력과 역량이 발휘된 결과다.',
            text: '어려운 상황에서 좆까를 외치며 묵묵히 할 일을 하던 그의 뒷모습',
        },
        present: {
            score1: 2,
            score2: 5,
            selection: '이 친구만이 채워줄 수 있었던 고유한 공백과 상실감이 클 것이다.',
            text: '온유는 참 매력적인 아이입니다. 거침없는 야생마같은 매력 뒤에 소심하게 숨어있는 그의 따뜻한 소녀미. 이거 맛보면 빠져나올 "구멍"이란 없습니다. 이러한 쾌락과 매력을 맛보게 해줘서 너무 고맙습니다.',
        },
        future: {
            score1: 5,
            score2: 5,
            selection: '새로운 가치를 만드는 창의와 도전 영역',
            text: '자신의 소신을 잃지않고 여전히 자신감 넘쳐 할말 못 할말 다 하고 다니는 모습',
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

// 이온유 전체 리포트 데이터
export const LEE_ONYU_REPORT_DATA: ReportData = (() => {
    const friendData = calculateAggregatedData(LEE_ONYU_FRIEND_EVALUATIONS);
    return {
        user: LEE_ONYU_SELF_DATA,
        friendData,
        gaps: calculateGaps(LEE_ONYU_SELF_DATA, friendData),
        friendEvaluations: LEE_ONYU_FRIEND_EVALUATIONS,
    };
})();

// 유저 이름으로 데이터 조회 (나중에 실제 API로 대체)
export function getReportDataByName(name: string): ReportData | null {
    if (name === '이온유') {
        return LEE_ONYU_REPORT_DATA;
    }
    return null;
}
