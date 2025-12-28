import { NextRequest, NextResponse } from 'next/server';
import { getReportData } from '@/lib/reportService';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name');

    if (!name) {
        return NextResponse.json(
            { error: '이름이 필요합니다.' },
            { status: 400 }
        );
    }

    try {
        const reportData = await getReportData(name);

        if (!reportData) {
            return NextResponse.json(
                { error: '해당 사용자를 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        return NextResponse.json(reportData);
    } catch (error) {
        console.error('Report API error:', error);
        return NextResponse.json(
            { error: '데이터를 불러오는데 실패했습니다.' },
            { status: 500 }
        );
    }
}
