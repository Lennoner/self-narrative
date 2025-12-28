import { NextRequest, NextResponse } from 'next/server';
import { getUserByName, fetchUserData } from '@/lib/googleSheets';

// 이메일 마스킹 함수: ony***@naver.com 형태로 변환
function maskEmail(email: string): string {
    const [localPart, domain] = email.split('@');
    if (!domain) return '***@***';

    const visibleLength = Math.min(3, localPart.length);
    const masked = localPart.slice(0, visibleLength) + '***';

    return `${masked}@${domain}`;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, step } = body;

        if (!name) {
            return NextResponse.json(
                { error: '이름이 필요합니다.' },
                { status: 400 }
            );
        }

        // Step 1: 이름으로 사용자 찾기 - 이메일 힌트 반환
        if (step === 'check-name') {
            const users = await fetchUserData();
            const matchingUsers = users.filter(u => u.name === name);

            if (matchingUsers.length === 0) {
                return NextResponse.json({
                    found: false,
                    message: '해당 이름으로 등록된 사용자를 찾을 수 없습니다.',
                });
            }

            // 동명이인이 있을 수 있으므로 첫 번째 사용자의 이메일 힌트 제공
            // 동명이인 처리: 이메일이 다른 경우 모두의 힌트를 보여줌
            const emailHints = [...new Set(matchingUsers.map(u => maskEmail(u.email)))];

            return NextResponse.json({
                found: true,
                emailHints,
                hasDuplicates: matchingUsers.length > 1,
                message: matchingUsers.length > 1
                    ? '동명이인이 있습니다. 본인의 이메일을 확인해주세요.'
                    : '이메일을 확인해주세요.',
            });
        }

        // Step 2: 이름 + 이메일로 인증
        if (step === 'verify-email') {
            const { email } = body;

            if (!email) {
                return NextResponse.json(
                    { error: '이메일이 필요합니다.' },
                    { status: 400 }
                );
            }

            const users = await fetchUserData();
            const matchedUser = users.find(
                u => u.name === name && u.email.toLowerCase() === email.toLowerCase()
            );

            if (!matchedUser) {
                return NextResponse.json({
                    verified: false,
                    message: '이메일이 일치하지 않습니다. 다시 확인해주세요.',
                });
            }

            return NextResponse.json({
                verified: true,
                userName: matchedUser.name,
                message: '인증되었습니다.',
            });
        }

        return NextResponse.json(
            { error: '잘못된 요청입니다.' },
            { status: 400 }
        );
    } catch (error) {
        console.error('Auth API error:', error);
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
