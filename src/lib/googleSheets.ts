// 구글시트 데이터 가져오기 유틸리티

const SPREADSHEET_ID = '1fgBvxfvCUnSeIoEU4zNLArm-6ABuPWvXgHDGjVZLAG4';
const USER_SHEET_GID = '0';
const FRIEND_SHEET_GID = '1840999970';

export interface RawUserData {
    submissionId: string;
    respondentId: string;
    submittedAt: string;
    name: string;
    email: string;
    baselineScore: number;
    pastScore1: number;
    pastScore2: number;
    pastSelection: string;
    pastText: string;
    presentScore1: number;
    presentScore2: number;
    presentSelection: string;
    presentText: string;
    futureScore1: number;
    futureScore2: number;
    futureSelection: string;
    futureText: string;
}

export interface RawFriendData {
    submissionId: string;
    respondentId: string;
    submittedAt: string;
    targetName: string;
    pastScore1: number;
    pastScore2: number;
    pastSelection: string;
    pastText: string;
    presentScore1: number;
    presentScore2: number;
    presentSelection: string;
    presentText: string;
    futureScore1: number;
    futureScore2: number;
    futureSelection: string;
    futureText: string;
}

function parseCSV(csv: string): string[][] {
    const lines: string[][] = [];
    let currentLine: string[] = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < csv.length; i++) {
        const char = csv[i];
        const nextChar = csv[i + 1];

        if (inQuotes) {
            if (char === '"' && nextChar === '"') {
                currentField += '"';
                i++; // Skip next quote
            } else if (char === '"') {
                inQuotes = false;
            } else {
                currentField += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                currentLine.push(currentField.trim());
                currentField = '';
            } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
                currentLine.push(currentField.trim());
                if (currentLine.some(field => field !== '')) {
                    lines.push(currentLine);
                }
                currentLine = [];
                currentField = '';
                if (char === '\r') i++; // Skip \n after \r
            } else {
                currentField += char;
            }
        }
    }

    // Push last field and line
    if (currentField || currentLine.length > 0) {
        currentLine.push(currentField.trim());
        if (currentLine.some(field => field !== '')) {
            lines.push(currentLine);
        }
    }

    return lines;
}

async function fetchSheetCSV(gid: string): Promise<string> {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}`;
    const response = await fetch(url, { next: { revalidate: 60 } }); // 60초 캐시

    if (!response.ok) {
        throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    }

    return response.text();
}

export async function fetchUserData(): Promise<RawUserData[]> {
    const csv = await fetchSheetCSV(USER_SHEET_GID);
    const rows = parseCSV(csv);

    // Skip header row
    const dataRows = rows.slice(1);

    return dataRows.map(row => ({
        submissionId: row[0] || '',
        respondentId: row[1] || '',
        submittedAt: row[2] || '',
        name: row[3] || '',
        email: row[4] || '',
        baselineScore: parseInt(row[5]) || 0,
        pastScore1: parseInt(row[6]) || 0,
        pastScore2: parseInt(row[7]) || 0,
        pastSelection: row[8] || '',
        pastText: row[9] || '',
        presentScore1: parseInt(row[10]) || 0,
        presentScore2: parseInt(row[11]) || 0,
        presentSelection: row[12] || '',
        presentText: row[13] || '',
        futureScore1: parseInt(row[14]) || 0,
        futureScore2: parseInt(row[15]) || 0,
        futureSelection: row[16] || '',
        futureText: row[17] || '',
    }));
}

export async function fetchFriendData(): Promise<RawFriendData[]> {
    const csv = await fetchSheetCSV(FRIEND_SHEET_GID);
    const rows = parseCSV(csv);

    // Skip header row
    const dataRows = rows.slice(1);

    return dataRows.map(row => ({
        submissionId: row[0] || '',
        respondentId: row[1] || '',
        submittedAt: row[2] || '',
        targetName: row[3] || '',
        pastScore1: parseInt(row[4]) || 0,
        pastScore2: parseInt(row[5]) || 0,
        pastSelection: row[6] || '',
        pastText: row[7] || '',
        presentScore1: parseInt(row[8]) || 0,
        presentScore2: parseInt(row[9]) || 0,
        presentSelection: row[10] || '',
        presentText: row[11] || '',
        futureScore1: parseInt(row[12]) || 0,
        futureScore2: parseInt(row[13]) || 0,
        futureSelection: row[14] || '',
        futureText: row[15] || '',
    }));
}

export async function getUserByName(name: string): Promise<RawUserData | null> {
    const users = await fetchUserData();
    return users.find(user => user.name === name) || null;
}

export async function getFriendResponsesByTargetName(targetName: string): Promise<RawFriendData[]> {
    const friends = await fetchFriendData();
    return friends.filter(friend => friend.targetName === targetName);
}

export async function getAllUserNames(): Promise<string[]> {
    const users = await fetchUserData();
    return users.map(user => user.name).filter(name => name !== '');
}
