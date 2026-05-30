import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnFlow — Student Dashboard",
  description:
    "Track your learning progress, manage courses, and stay on top of your academic goals with LearnFlow.",
  keywords: ["student dashboard", "learning", "courses", "progress tracking"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
