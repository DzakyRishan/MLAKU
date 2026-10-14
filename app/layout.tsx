import type {Metadata} from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import Providers from '@/components/Providers';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "MLAKU — Jelajahi Nusantara | Modern Indonesian Travel Experience",
  description:
    'Platform kurasi perjalanan eksklusif dan slow luxury menjelajahi alam, budaya, dan suaka Nusantara Indonesia dengan kurator lokal dan asisten AI.',
  openGraph: {
    title: "MLAKU — Jelajahi Nusantara",
    description:
      'Platform kurasi perjalanan eksklusif dan slow luxury menjelajahi alam, budaya, dan suaka Nusantara Indonesia.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "MLAKU — Jelajahi Nusantara",
    description:
      'Platform kurasi perjalanan eksklusif dan slow luxury menjelajahi alam, budaya, dan suaka Nusantara Indonesia.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" className={`scroll-smooth ${playfair.variable} ${manrope.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var origFetch = window.fetch;
                  var currentFetch = origFetch;
                  var descriptor = {
                    get: function() {
                      return currentFetch;
                    },
                    set: function(val) {
                      currentFetch = val;
                    },
                    configurable: true,
                    enumerable: true
                  };
                  try {
                    Object.defineProperty(window, 'fetch', descriptor);
                  } catch (_) {}
                  try {
                    if (typeof Window !== 'undefined' && Window.prototype) {
                      Object.defineProperty(Window.prototype, 'fetch', descriptor);
                    }
                  } catch (_) {}
                } catch (e) {}

                if (typeof window !== 'undefined') {
                  var prevOnError = window.onerror;
                  window.onerror = function(message, source, lineno, colno, error) {
                    var msgStr = String(message || '');
                    var srcStr = String(source || '');
                    var stackStr = String((error && error.stack) || '');
                    if (
                      srcStr.indexOf('chrome-extension:') !== -1 ||
                      srcStr.indexOf('moz-extension:') !== -1 ||
                      msgStr.indexOf('fetch of #<Window>') !== -1 ||
                      stackStr.indexOf('chrome-extension:') !== -1 ||
                      msgStr.indexOf('prerender-manifest.json') !== -1
                    ) {
                      return true;
                    }
                    if (typeof prevOnError === 'function') {
                      return prevOnError.apply(this, arguments);
                    }
                    return false;
                  };

                  window.addEventListener('error', function(event) {
                    if (event && (
                      (event.filename && (event.filename.indexOf('chrome-extension:') !== -1 || event.filename.indexOf('moz-extension:') !== -1)) ||
                      (event.message && (
                        event.message.indexOf('fetch of #<Window>') !== -1 ||
                        event.message.indexOf('popup-closed-by-user') !== -1 ||
                        event.message.indexOf('Could not reach Cloud Firestore backend') !== -1 ||
                        event.message.indexOf('the client is offline') !== -1 ||
                        event.message.indexOf('Failed to get document') !== -1 ||
                        event.message.indexOf('prerender-manifest.json') !== -1
                      ))
                    )) {
                      event.stopImmediatePropagation();
                      event.preventDefault();
                      return true;
                    }
                  }, true);

                  window.addEventListener('unhandledrejection', function(event) {
                    if (event && event.reason) {
                      var reasonStr = String(event.reason.stack || event.reason.message || event.reason);
                      if (
                        reasonStr.indexOf('chrome-extension:') !== -1 ||
                        reasonStr.indexOf('fetch of #<Window>') !== -1 ||
                        reasonStr.indexOf('popup-closed-by-user') !== -1 ||
                        reasonStr.indexOf('cancelled-popup-request') !== -1 ||
                        reasonStr.indexOf('Could not reach Cloud Firestore backend') !== -1 ||
                        reasonStr.indexOf('the client is offline') !== -1 ||
                        reasonStr.indexOf('Failed to get document') !== -1 ||
                        reasonStr.indexOf('prerender-manifest.json') !== -1
                      ) {
                        event.stopImmediatePropagation();
                        event.preventDefault();
                      }
                    }
                  }, true);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#fff8f4] text-[#1e1b18] antialiased selection:bg-[#ffdbcf] selection:text-[#2e150b] font-sans" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

