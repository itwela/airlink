import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AirLinkProvider } from "./airlinkContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airlink",
  description: "Travel made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
      <AirLinkProvider>
        {children}
    </AirLinkProvider>
      </body>
    </html>
  );
}
