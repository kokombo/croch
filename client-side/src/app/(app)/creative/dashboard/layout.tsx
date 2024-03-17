"use client";

import { NavigationBar } from "@/components";
import "../../../globals.css";

export default function DashboardLayout({
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
