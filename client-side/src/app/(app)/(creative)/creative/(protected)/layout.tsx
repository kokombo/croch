"use client";
import "@/app/globals.css";
import { Footer } from "@/components";
import { CreativeNavigationBar } from "@/components/navigation-bars";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

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
    <Fragment>
      {!hideHeaderAndFooter && <CreativeNavigationBar />}
      {children}
      {!hideHeaderAndFooter && <Footer />}
    </Fragment>
  );
}
