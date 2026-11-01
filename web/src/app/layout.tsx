import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IndexX – Search Beyond Limits",
  description: "Clean, high-performance intelligent search engine platform for the Speed Demon 72-Hour Hackathon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased selection:bg-blue-100 selection:text-blue-900 min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
