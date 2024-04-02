"use client";

import { Footer, NavigationBar, UserSegmentRedirect } from "@/components";
import "../../globals.css";

const CustomerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <UserSegmentRedirect>
      <NavigationBar />

      {children}

      <Footer />
    </UserSegmentRedirect>
  );
};

export default CustomerLayout;
