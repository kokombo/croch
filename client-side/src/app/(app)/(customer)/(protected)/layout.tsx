"use client";

import "../../../globals.css";
import { CustomerNavigationBar } from "@/components/navigation-bars";
import { Footer, ProtectRoute } from "@/components";

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
