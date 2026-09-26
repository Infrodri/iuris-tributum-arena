import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0B0620" />
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
                      ink: { 950: '#0B0620', 900: '#140F33', 850: '#1B1547', 800: '#251C63', 700: '#352A86' },
                      deep: { 950: '#070A11', 900: '#0E1424', 850: '#141D33', 800: '#1B2642', 700: '#253457' },
                      gold: { 200: '#FEF3C7', 300: '#FDE68A', 400: '#FBBF24', 500: '#F59E0B', 600: '#D97706', 700: '#B45309' },
                      royal: { 300: '#C4B5FD', 400: '#A78BFA', 500: '#8B5CF6', 600: '#7C3AED' },
                      mint: { 300: '#6EE7B7', 400: '#34D399', 500: '#10B981' },
                      coral: { 400: '#FB7185', 500: '#F43F5E', 600: '#E11D48' },
                      emeraldLaw: { 400: '#34D399', 500: '#10B981', 600: '#059669', 800: '#064E3B' }
                    },
                    boxShadow: {
                      'glow-gold': '0 0 24px rgba(251,191,36,0.35)',
                      'glow-mint': '0 0 24px rgba(52,211,153,0.35)',
                      'card': '0 12px 40px rgba(0,0,0,0.45)'
                    }
                  }
                }
              }
            `
          }}
        />
        <style>{`
          html { -webkit-tap-highlight-color: transparent; }
          body {
            background:
              radial-gradient(600px 400px at 15% -5%, rgba(139,92,246,0.35), transparent 60%),
              radial-gradient(700px 450px at 90% 10%, rgba(245,158,11,0.22), transparent 60%),
              radial-gradient(500px 500px at 50% 110%, rgba(16,185,129,0.16), transparent 60%),
              #0B0620;
            min-height: 100dvh;
            overscroll-behavior-y: none;
          }
          * { touch-action: manipulation; }
          input, button { font-size: 16px; }
          .glass-panel {
            background: linear-gradient(150deg, rgba(27,21,71,0.88) 0%, rgba(11,6,32,0.94) 100%);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(251,191,36,0.16);
            box-shadow: 0 12px 40px rgba(0,0,0,0.45);
          }
          .arena-title {
            background: linear-gradient(92deg, #FEF3C7 0%, #FBBF24 35%, #F59E0B 60%, #C4B5FD 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .arena-btn { min-height: 52px; }
          .arena-opt { min-height: 60px; }
          .safe-bottom { padding-bottom: max(1rem, env(safe-area-inset-bottom)); }
          @keyframes arena-pop { 0% { transform: scale(0.96); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          @keyframes arena-shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
          @keyframes arena-rise { 0% { transform: translateY(10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
          @keyframes arena-pulse-glow { 0%,100% { box-shadow: 0 0 0 rgba(251,191,36,0); } 50% { box-shadow: 0 0 26px rgba(251,191,36,0.45); } }
          .anim-pop { animation: arena-pop 0.22s ease-out; }
          .anim-shake { animation: arena-shake 0.25s ease-in-out; }
          .anim-rise { animation: arena-rise 0.3s ease-out; }
          .anim-glow { animation: arena-pulse-glow 1.6s ease-in-out infinite; }
          .flip-scene { perspective: 1200px; }
          .flip-inner { transform-style: preserve-3d; transition: transform 0.45s cubic-bezier(0.2,0.7,0.3,1.2); }
          .flip-inner.flipped { transform: rotateY(180deg); }
          .flip-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
          .flip-back { transform: rotateY(180deg); }
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: #140F33; }
          ::-webkit-scrollbar-thumb { background: #352A86; border-radius: 3px; }
        `}</style>
      </Head>
      <body className="bg-deep-950 text-slate-100 font-sans min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
