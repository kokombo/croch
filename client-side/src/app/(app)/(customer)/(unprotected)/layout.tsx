"use client";

import "../../../globals.css";
import { CustomerNavigationBar } from "@/components/navigation-bars";
import { Footer, UserSegmentRedirect } from "@/components";

const CustomerUnprotectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <UserSegmentRedirect>
      <CustomerNavigationBar />

      {children}

      <Footer />
    </UserSegmentRedirect>
  );
};

export default CustomerUnprotectedLayout;
