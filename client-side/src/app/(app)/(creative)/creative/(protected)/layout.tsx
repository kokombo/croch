"use client";

import "../../../../globals.css";
import { CreativeNavigationBar, Footer, ProtectRoute } from "@/components";
import { usePathname } from "next/navigation";

export default function CreativeProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hideHeaderAndFooter = Boolean(pathname === "/become-a-creative");

  return (
    <ProtectRoute>
      {!hideHeaderAndFooter && <CreativeNavigationBar />}

      {children}

      {!hideHeaderAndFooter && <Footer />}
    </ProtectRoute>
  );
}
