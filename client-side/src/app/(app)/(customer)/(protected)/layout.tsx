"use client";

import { ProtectRoute } from "@/components";
import "../../../globals.css";

const CustomerProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ProtectRoute>{children}</ProtectRoute>;
};

export default CustomerProtectedLayout;
