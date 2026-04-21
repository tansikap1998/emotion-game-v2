import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ชุดอารมณ์พื้นฐาน 🐾",
  description: "เกมเรียนรู้อารมณ์พื้นฐาน 8 ชนิด สำหรับเด็ก — ลากวางการ์ดสถานการณ์ให้ตรงกับอารมณ์",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mitr:wght@300;400;500;600&family=Kanit:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-mitr">{children}</body>
    </html>
  );
}
