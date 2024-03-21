"use client";

import { useCurrentUser } from "@/utilities";
import "../../globals.css";
import { redirect } from "next/navigation";

export default function CreativeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
