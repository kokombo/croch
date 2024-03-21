"use client";

import "../../globals.css";
import { NavigationBar, ProtectRoute } from "@/components";

export default function CartLayout({
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
