"use client";

import "../../../../../globals.css";
import { Fragment } from "react";

export default function CreativeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Fragment>{children}</Fragment>;
}
