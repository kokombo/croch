"use client";

import { Footer, ProtectRoute } from "@/components";
import "../../../../globals.css";

export default function CreativeProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectRoute>{children}</ProtectRoute>;
}
