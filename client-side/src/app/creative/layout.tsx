"use client";

import { useCurrentUser } from "@/utilities";
import "../globals.css";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, role } = useCurrentUser();

  if (session && role === "customer") {
    redirect("/");
  }

  return <>{children}</>;
}
