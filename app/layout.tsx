import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/Navbar";
import TopBar from "./_components/navbar/TopBar";
import Providers from "./_components/Providers";
import Footer from "./_components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreshCart - E-Commerce",
  description: "Your favorite online grocery store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-gray-900`}>
        <Providers>
          <TopBar />
          <Navbar />
          <main className="grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
