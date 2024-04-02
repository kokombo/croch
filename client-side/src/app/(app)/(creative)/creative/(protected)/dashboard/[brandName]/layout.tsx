"use client";
import { CreativeNavigationBar } from "@/components";
import "../../../../../../globals.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CreativeNavigationBar />

      {children}
    </>
  );
}
