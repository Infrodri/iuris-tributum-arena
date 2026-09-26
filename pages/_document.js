import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/@phosphor-icons/web"></script>
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    fontFamily: {
                      serif: ['"Playfair Display"', 'Georgia', 'serif'],
                      sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
                    },
                    colors: {
                      deep: { 950: '#070A11', 900: '#0E1424', 850: '#141D33', 800: '#1B2642', 700: '#253457' },
                      gold: { 300: '#FDE68A', 400: '#FBBF24', 500: '#F59E0B', 600: '#D97706', 700: '#B45309' },
                      emeraldLaw: { 400: '#34D399', 500: '#10B981', 600: '#059669', 800: '#064E3B' }
                    }
                  }
                }
              }
            `
          }}
        />
        <style>{`
          .glass-panel {
            background: linear-gradient(135deg, rgba(20,29,51,0.85) 0%, rgba(14,20,36,0.95) 100%);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(245,158,11,0.15);
          }
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: #0E1424; }
          ::-webkit-scrollbar-thumb { background: #253457; border-radius: 3px; }
        `}</style>
      </Head>
      <body className="bg-deep-950 text-slate-100 font-sans min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
