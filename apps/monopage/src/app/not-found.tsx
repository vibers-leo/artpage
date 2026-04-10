import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-4xl font-black">404</p>
      <p className="text-gray-400 text-sm font-medium">페이지를 찾을 수 없어요</p>
      <Link
        href="/"
        className="mt-4 px-6 py-3 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
      >
        홈으로
      </Link>
    </div>
  );
}
