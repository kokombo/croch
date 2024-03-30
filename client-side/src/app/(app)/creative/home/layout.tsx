"use client";
import { UserSegmentRedirect } from "@/components";
import "../../../globals.css";

export default function CreativeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <UserSegmentRedirect>{children}</UserSegmentRedirect>;
}
