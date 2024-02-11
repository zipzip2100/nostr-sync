import type { Metadata } from "next";
import { Inter } from "next/font/google";
import App from "@/container/App";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nostr sync",
  description: "nostr sync tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <App>{children}</App>
      </body>
    </html>
  );
}
