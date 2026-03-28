import Link from "next/link";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import VibersBanner from "@/components/VibersBanner";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7704550771011130"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Admin Header / Nav */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/admin" className="font-serif font-bold text-xl">
                            ARTWAY ADMIN
                        </Link>
                        <nav className="flex gap-6 text-sm font-medium text-gray-500">
                            <Link
                                href="/admin/exhibition"
                                className="hover:text-black transition-colors"
                            >
                                전시 관리
                            </Link>
                            <Link
                                href="/admin/media"
                                className="hover:text-black transition-colors"
                            >
                                언론보도 관리
                            </Link>
                            <Link
                                href="/admin/portfolio"
                                className="hover:text-black transition-colors"
                            >
                                포트폴리오 관리
                            </Link>
                            {/* 추가 메뉴 공간 */}
                        </nav>
                    </div>
                    <div>
                        <Link href="/">
                            <Button variant="ghost" size="sm">
                                나가기
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {children}
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 16px' }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8 }}>계발자들 프로젝트</p>
                <VibersBanner size="medium" currentProject="artpage" />
            </div>
        </div>
        </>
    );
}
