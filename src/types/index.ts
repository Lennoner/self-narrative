// 설문 데이터 타입 정의

// 시간대별 점수 (과거/현재/미래)
export interface TimeScores {
  score1: number; // 1-5점
  score2: number; // 1-5점
  selection: string; // 선택형 응답
  text: string; // 서술형 응답
}

// 사용자 자가 진단 데이터
export interface UserSelfData {
  name: string;
  email: string;
  submissionId: string;
  submissionDate: string;
  baselineScore: number; // 기본 심리 상태 (1-5)
  
  // 과거: 인지적 오류 교정
  past: TimeScores;
  
  // 현재: 사회적 가치 입증
  present: TimeScores;
  
  // 미래: 잠재역량 도출
  future: TimeScores;
}

// 지인 평가 데이터 (개별)
export interface FriendEvaluation {
  submissionId: string;
  submissionDate: string;
  targetUser: string; // 평가 대상 사용자 이름
  
  // 과거
  past: TimeScores;
  
  // 현재
  present: TimeScores;
  
  // 미래
  future: TimeScores;
}

// 지인 평가 집계 데이터
export interface FriendAggregatedData {
  pastScore1Avg: number;
  pastScore2Avg: number;
  pastTexts: string[];
  
  presentScore1Avg: number;
  presentScore2Avg: number;
  presentTexts: string[];
  
  futureScore1Avg: number;
  futureScore2Avg: number;
  futureTexts: string[];
  
  totalResponses: number;
}

// 인식 격차 데이터
export interface GapData {
  category: string; // 과거/현재/미래
  dimension: string; // score1/score2
  label: string; // 표시 라벨
  selfScore: number;
  friendAvgScore: number;
  gap: number; // friend - self (양수: 지인이 더 높이 평가)
}

// 최종 리포트 데이터
export interface ReportData {
  user: UserSelfData;
  friendData: FriendAggregatedData;
  gaps: GapData[];
  friendEvaluations: FriendEvaluation[];
}

// 질문 라벨 정의
export const QUESTION_LABELS = {
  past: {
    score1: '극복력',
    score2: '자부심',
    description: '인지적 오류 교정',
    selfQuestion1: '나는 과거에 어려운 상황이나 난관을 결국 내 힘으로 극복해본 적이 있다.',
    selfQuestion2: '나는 내가 거둔 성과나 결과물에 대해 충분히 자부심을 느낀다.',
    friendQuestion1: '이 친구는 어려운 상황이나 난관이 닥쳐도 결국 스스로의 힘으로 극복해내는 단단한 사람인가요?',
    friendQuestion2: '당신은 이 친구가 이뤄낸 성과나 성취를 보며 대단하다고 느끼거나 자부심을 느낀 적이 있나요?',
  },
  present: {
    score1: '영향력',
    score2: '필요성',
    description: '사회적 가치 입증',
    selfQuestion1: '나는 현재 주변 사람들의 삶에 긍정적인 영향을 주고 있다.',
    selfQuestion2: '나는 내가 속한 그룹에서 꼭 필요한 사람이라고 느낀다.',
    friendQuestion1: '이 친구는 현재 당신의 일상이나 주변 사람들의 삶에 긍정적인 영향을 주고 있나요?',
    friendQuestion2: '이 친구는 당신이 속한 그룹에서 꼭 필요한 사람이라고 생각하시나요?',
  },
  future: {
    score1: '잠재력',
    score2: '성장기대',
    description: '잠재역량 도출',
    selfQuestion1: '나는 미래에 내가 원하는 분야에서 나만의 가치를 증명할 잠재력이 충분하다.',
    selfQuestion2: '3년뒤의 나는 지금보다 훨씬 더 나다운 삶을 살고 있을 것이다.',
    friendQuestion1: '이 친구는 자신이 원하는 분야에서 충분히 성공하거나 가치를 증명할 잠재력이 있다고 믿으시나요?',
    friendQuestion2: '3년 뒤의 이 친구는 지금보다 더 자기다운 멋진 삶을 살고 있을까요?',
  },
} as const;
