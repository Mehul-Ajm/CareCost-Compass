import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Cancer Treatment Cost Clarity | Hack4Hope",
  description: "Simple, clear estimates and resources for cancer treatment costs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-20">
          <div className="h-[1px] bg-[linear-gradient(90deg,transparent,rgba(79,140,255,0.6),transparent)]" />
          <div className="backdrop-blur-sm bg-black/20 border-b border-white/10">
            <div className="container px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-[#4f8cff]" />
                <span className="font-semibold tracking-tight">CareCost Compass</span>
              </div>
              <nav className="hidden sm:flex items-center gap-6 text-sm text-white/70">
                <a href="/#selector" className="hover:text-white">Estimates</a>
                <a href="/resources" className="hover:text-white">Resources</a>
                <a href="/about" className="hover:text-white">About</a>
              </nav>
            </div>
          </div>
        </header>
        {children}
        <footer className="mt-16 py-10 text-center text-sm text-white/50">
          <div className="container px-6">
            Built for Hack4Hope. This tool is for demo purposes and not medical or financial advice.
          </div>
        </footer>
      </body>
    </html>
  );
}
