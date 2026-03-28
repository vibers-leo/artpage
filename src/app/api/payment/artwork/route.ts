// src/app/api/payment/artwork/route.ts
// POST: 작품 구매 요청 처리 (PortOne 연동 준비)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// 커미션 비율 8%
const COMMISSION_RATE = 0.08;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { artwork_id, site_slug, buyer_email, buyer_name } = body;

    if (!artwork_id || !site_slug || !buyer_email) {
      return NextResponse.json(
        { success: false, error: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 작품 조회
    const artwork = await prisma.artwork.findUnique({
      where: { id: artwork_id },
    });

    if (!artwork) {
      return NextResponse.json(
        { success: false, error: "작품을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (artwork.is_sold) {
      return NextResponse.json(
        { success: false, error: "이미 판매된 작품입니다." },
        { status: 400 }
      );
    }

    // 커미션 계산
    const commission = Math.round(artwork.price * COMMISSION_RATE);
    const artist_payout = artwork.price - commission;

    // 거래 생성 (pending 상태)
    const transaction = await prisma.artTransaction.create({
      data: {
        artwork_id: artwork.id,
        site_slug,
        buyer_email,
        buyer_name: buyer_name || null,
        amount: artwork.price,
        commission,
        artist_payout,
        status: "pending",
      },
    });

    // TODO: PortOne 결제 연동
    // 현재는 구매 요청만 기록하고 수동 결제 처리
    // PortOne 연동 시 payment_id를 함께 반환

    return NextResponse.json({
      success: true,
      data: {
        transaction_id: transaction.id,
        amount: artwork.price,
        commission,
        artist_payout,
        // payment_url: PortOne 결제 URL (추후 연동)
      },
    });
  } catch (error: any) {
    console.error("작품 결제 API 오류:", error);
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
