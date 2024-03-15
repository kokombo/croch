"use client";

import { NavigationBar } from "@/components";

import "../../globals.css";

export default function ProductPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationBar />

      {children}
    </>
  );
}
