import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CrmProvider } from "@/context/CrmContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CRM SaaS Dashboard",
  description: "Modern CRM dashboard for managing clients, deals, and tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full font-sans antialiased">
        <CrmProvider>{children}</CrmProvider>
      </body>
    </html>
  );
}
