"use client";

import { CreativeNavigationBar, Footer } from "@/components";
import "../../../../../../globals.css";
import { Fragment } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <CreativeNavigationBar />

      {children}

      <Footer />
    </Fragment>
  );
}
