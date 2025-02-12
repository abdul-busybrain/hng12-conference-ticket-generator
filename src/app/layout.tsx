import type { Metadata } from "next";
import { Montserrat, Roboto, Road_Rage } from "next/font/google";
import "./globals.css";

const monstserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

const roadRage = Road_Rage({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-road-rage",
});

export const metadata: Metadata = {
  title: "Conference Ticket Generator",
  description: "HNG12 - Stage 2 Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roadRage.variable}`}>
      <body className={`px-24 pt-4`}>{children}</body>
    </html>
  );
}
