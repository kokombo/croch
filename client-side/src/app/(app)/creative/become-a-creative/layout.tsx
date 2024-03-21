"use client";

import { NavigationBar, ProtectRoute } from "@/components";
import "../../../globals.css";

export default function DashboardLayout({
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
