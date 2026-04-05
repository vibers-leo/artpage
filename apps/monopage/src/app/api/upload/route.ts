import { NextRequest, NextResponse } from 'next/server';

const UPLOAD_SERVER = process.env.UPLOAD_SERVER_URL || 'http://49.50.138.93:8091';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const res = await fetch(`${UPLOAD_SERVER}/upload`, {
      method: 'POST',
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
