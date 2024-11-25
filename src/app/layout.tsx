import type { Metadata } from "next";
import { Funnel_Sans } from 'next/font/google';
import "./globals.css";

const funnelSans = Funnel_Sans({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Books",
  description: "Search books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={funnelSans.className}>
      <body className="bg-[#262626] text-[#d4d4d8]">

        {children}
      </body>
    </html>
  );
}
