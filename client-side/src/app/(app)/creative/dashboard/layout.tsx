"use client";
import { CreativeNavigationBar, ProtectRoute } from "@/components";
import "../../../globals.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectRoute>
      <CreativeNavigationBar />

      {children}
    </ProtectRoute>
  );
}
