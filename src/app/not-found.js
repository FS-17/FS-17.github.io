import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function NotFound() {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gray-900 text-gray-200`}
      >
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden grid-pattern">
          {/* Animated background orbs */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-500/20 blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-600/25 to-pink-500/15 blur-[80px] animate-pulse delay-700"></div>
          </div>

          <div className="container mx-auto px-6 py-20 text-center relative z-10">
            <h1 className="text-9xl font-black mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Go Home
              </Link>
              <Link
                href="/ar"
                className="px-8 py-3 rounded-full glass-card border border-white/10 hover:bg-white/5 text-gray-300 font-medium transition-all duration-300 hover:scale-105"
              >
                الرئيسية (Arabic)
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
