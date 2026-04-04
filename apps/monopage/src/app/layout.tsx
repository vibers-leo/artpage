import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monopage",
  description: "나만의 아티스트 페이지를 만들어보세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
