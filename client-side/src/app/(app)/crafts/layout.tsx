"use client";

import "../../globals.css";
import { Footer, NavigationBar } from "@/components";

export default function ProductPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationBar />

      {children}

      <Footer />
    </>
  );
}
