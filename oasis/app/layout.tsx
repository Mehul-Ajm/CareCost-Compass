import type { Metadata } from "next";
import { Geist, Geist_Mono, Saira } from "next/font/google";
import "./globals.css";
import { ConditionalNavbar } from "@/components/conditional-navbar";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oasis Workflow",
  description: "Oasis Workflow is a platform for creating and managing workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${saira.variable} antialiased`}
      >
        <ConditionalNavbar />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}

