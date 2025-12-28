// 구글시트 데이터를 리포트 형식으로 변환하는 함수들

import {
    RawUserData,
    RawFriendData,
    getUserByName,
    getFriendResponsesByTargetName
} from './googleSheets';
import {
    UserSelfData,
    FriendEvaluation,
    FriendAggregatedData,
    GapData,
    ReportData
} from '@/types';

function transformUserData(raw: RawUserData): UserSelfData {
    return {
        name: raw.name,
        email: raw.email,
        submissionId: raw.submissionId,
        submissionDate: raw.submittedAt,
        baselineScore: raw.baselineScore,
        past: {
            score1: raw.pastScore1,
            score2: raw.pastScore2,
            selection: raw.pastSelection,
            text: raw.pastText,
        },
        present: {
            score1: raw.presentScore1,
            score2: raw.presentScore2,
            selection: raw.presentSelection,
            text: raw.presentText,
        },
        future: {
            score1: raw.futureScore1,
            score2: raw.futureScore2,
            selection: raw.futureSelection,
            text: raw.futureText,
        },
    };
}

function transformFriendData(raw: RawFriendData): FriendEvaluation {
    return {
        submissionId: raw.submissionId,
        submissionDate: raw.submittedAt,
        targetUser: raw.targetName,
        past: {
            score1: raw.pastScore1,
            score2: raw.pastScore2,
            selection: raw.pastSelection,
            text: raw.pastText,
        },
        present: {
            score1: raw.presentScore1,
            score2: raw.presentScore2,
            selection: raw.presentSelection,
            text: raw.presentText,
        },
        future: {
            score1: raw.futureScore1,
            score2: raw.futureScore2,
            selection: raw.futureSelection,
            text: raw.futureText,
        },
    };
}

function calculateAggregatedData(evaluations: FriendEvaluation[]): FriendAggregatedData {
    if (evaluations.length === 0) {
        return {
            pastScore1Avg: 0,
            pastScore2Avg: 0,
            pastTexts: [],
            presentScore1Avg: 0,
            presentScore2Avg: 0,
            presentTexts: [],
            futureScore1Avg: 0,
            futureScore2Avg: 0,
            futureTexts: [],
            totalResponses: 0,
        };
    }

    const n = evaluations.length;

    return {
        pastScore1Avg: evaluations.reduce((sum, e) => sum + e.past.score1, 0) / n,
        pastScore2Avg: evaluations.reduce((sum, e) => sum + e.past.score2, 0) / n,
        pastTexts: evaluations.map(e => e.past.text).filter(t => t),
        presentScore1Avg: evaluations.reduce((sum, e) => sum + e.present.score1, 0) / n,
        presentScore2Avg: evaluations.reduce((sum, e) => sum + e.present.score2, 0) / n,
        presentTexts: evaluations.map(e => e.present.text).filter(t => t),
        futureScore1Avg: evaluations.reduce((sum, e) => sum + e.future.score1, 0) / n,
        futureScore2Avg: evaluations.reduce((sum, e) => sum + e.future.score2, 0) / n,
        futureTexts: evaluations.map(e => e.future.text).filter(t => t),
        totalResponses: n,
    };
}

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

export async function getReportData(userName: string): Promise<ReportData | null> {
    try {
        // 사용자 데이터 가져오기
        const rawUser = await getUserByName(userName);
        if (!rawUser) {
            return null;
        }

        // 지인 응답 가져오기
        const rawFriends = await getFriendResponsesByTargetName(userName);

        // 데이터 변환
        const user = transformUserData(rawUser);
        const friendEvaluations = rawFriends.map(transformFriendData);
        const friendData = calculateAggregatedData(friendEvaluations);
        const gaps = calculateGaps(user, friendData);

        return {
            user,
            friendData,
            gaps,
            friendEvaluations,
        };
    } catch (error) {
        console.error('Error fetching report data:', error);
        return null;
    }
}
