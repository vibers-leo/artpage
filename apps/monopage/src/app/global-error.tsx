'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>문제가 발생했어요</h2>
          <button
            onClick={() => reset()}
            style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: '#000', color: '#fff', border: 'none', borderRadius: '9999px', cursor: 'pointer', fontWeight: 700 }}
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
