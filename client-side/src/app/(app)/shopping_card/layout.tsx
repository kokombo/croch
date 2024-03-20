"use client";

import "../../globals.css";
import { NavigationBar } from "@/components";

export default function ShoppingCardLayout({
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
