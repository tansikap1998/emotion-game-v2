import type { Metadata } from "next";
import { Mitr, Kanit } from "next/font/google";
import "./globals.css";

const mitr = Mitr({ weight: ["300","400","500","600"], subsets: ["thai","latin"], variable: "--font-mitr", display: "swap" });
const kanit = Kanit({ weight: ["300","400","500","700"], subsets: ["thai","latin"], variable: "--font-kanit", display: "swap" });

export const metadata: Metadata = {
  title: "ชุดอารมณ์พื้นฐาน 🐾",
  description: "เกมเรียนรู้อารมณ์พื้นฐาน 8 ชนิด สำหรับเด็ก",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${mitr.variable} ${kanit.variable} font-mitr`}>{children}</body>
    </html>
  );
}
