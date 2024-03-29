"use client";

import "../../globals.css";
import { Footer, NavigationBar, ProtectRoute } from "@/components";

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectRoute>
      <NavigationBar />

      {children}

      <Footer />
    </ProtectRoute>
  );
}
