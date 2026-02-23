import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAuthToken } from "@/lib/auth/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "P-Hero - Empowering Through Education",
  description: "Quality education and social development programs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check auth state on server
  const token = await getAuthToken();
  const isLoggedIn = !!token;

  // Decode user name from JWT payload (base64)
  let userName: string | undefined;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userName = payload.name;
    } catch {
      // Token decode failed, ignore
    }
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header isLoggedIn={isLoggedIn} userName={userName} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
