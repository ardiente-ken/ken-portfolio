import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ken Angelo Ardiente | Full-Stack Developer",
  description: "Developer portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased dark" data-theme="dark">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}