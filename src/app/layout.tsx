import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAuthToken, decodeToken } from "@/lib/auth/session";
import { getCurrentUser } from "@/lib/auth/actions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IDEA - Empowering Minds, Transforming Futures",
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

  // Decode user name from JWT payload or fetch user
  let userName: string | undefined;
  let avatar: string | null = null;
  
  if (token) {
    const user = await getCurrentUser();
    if (user) {
      userName = user.name;
      avatar = user.avatar ?? null;
    } else {
      const payload = decodeToken(token);
      userName = payload?.name;
    }
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header isLoggedIn={isLoggedIn} userName={userName} avatar={avatar} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
