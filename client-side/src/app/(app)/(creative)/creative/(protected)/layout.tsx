"use client";

import "../../../../globals.css";
import { Footer, ProtectRoute } from "@/components";
import { CreativeNavigationBar } from "@/components/navigation-bars";
import { usePathname } from "next/navigation";

export default function CreativeProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hideHeaderAndFooter = Boolean(
    pathname === "/creative/become-a-creative"
  );

  return (
    <ProtectRoute>
      {!hideHeaderAndFooter && <CreativeNavigationBar />}

      {children}

      {!hideHeaderAndFooter && <Footer />}
    </ProtectRoute>
  );
}
