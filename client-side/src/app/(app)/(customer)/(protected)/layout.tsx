"use client";

import { CustomerNavigationBar, Footer, ProtectRoute } from "@/components";
import "../../../globals.css";

const CustomerProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectRoute>
      <CustomerNavigationBar />
      {children}

      <Footer />
    </ProtectRoute>
  );
};

export default CustomerProtectedLayout;
