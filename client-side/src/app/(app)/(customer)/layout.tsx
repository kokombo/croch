"use client";

import {
  Footer,
  CustomerNavigationBar,
  UserSegmentRedirect,
} from "@/components";
import "../../globals.css";

const CustomerLayout = ({
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

export default CustomerLayout;
