import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MateCheck — 우리 둘만의 공간",
  description: "파트너와 함께하는 일상 관리. 미션, 목표, 일정, 가계부까지.",
  openGraph: {
    title: "MateCheck",
    description: "파트너와 함께하는 일상 관리",
    siteName: "MateCheck",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="gradient-bg min-h-screen text-white">
        {children}
      </body>
    </html>
  );
}
