import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/src/components/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global ticket App",
  description: "Developed by Global ticket management team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="px-12">
          <NavBar />
          <div className="mt-10 mx-20"> {children}</div>
        </div>
      </body>
    </html>
  );
}
