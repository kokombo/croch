"use client";

import "../../globals.css";
import { NavigationBar, ProtectRoute } from "@/components";

export default function ShoppingCardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectRoute>
      <NavigationBar />

      {children}
    </ProtectRoute>
  );
}
