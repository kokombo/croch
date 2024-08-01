import "./globals.css";
import { MacanRegular } from "./font";
import Providers from "./providers";
import type { Metadata } from "next";

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
        <Providers>
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
