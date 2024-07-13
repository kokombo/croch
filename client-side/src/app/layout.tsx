import "./globals.css";
import { Montserrat } from "next/font/google";
import { MacanRegular } from "./font";
import Providers from "./providers";
import type { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin-ext"],
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Croch",
  description: "Discover thousands of amazing handcrafted items by creative.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={MacanRegular.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
