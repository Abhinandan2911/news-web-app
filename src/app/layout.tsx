import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Times Now - Live & Breaking News",
  description: "Stay updated with breaking news, top headlines, business, politics, tech, and world news.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
