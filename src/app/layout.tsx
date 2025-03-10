import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/UI/NavBar";
import { AuthProvider } from "./components/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`flex ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="fixed">
            <NavBar />
          </div>
          <main className="w-full md:ms-56">{children}</main>
        </body>
      </AuthProvider>
    </html>
  );
}
