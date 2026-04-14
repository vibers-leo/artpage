import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.BACKEND_URL || 'http://49.50.138.93:4110';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization') || '';
    const formData = await request.formData();
    const res = await fetch(`${API_URL}/api/v1/upload`, {
      method: 'POST',
      headers: { Authorization: token },
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `업로드 실패: ${text}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `서버 오류: ${String(error)}` }, { status: 500 });
  }
}
