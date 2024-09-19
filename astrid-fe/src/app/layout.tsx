import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import HomeNavbarAST from "@/components/navbar/homeNavbarAST";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Astrid",
  description: "Unifed data search portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HomeNavbarAST/>
        {children}
      </body>
    </html>
  );
}
