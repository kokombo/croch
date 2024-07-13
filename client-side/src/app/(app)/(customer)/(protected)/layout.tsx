"use client";
import "@/app/globals.css";
import { CustomerNavigationBar } from "@/components/navigation-bars";
import { Footer } from "@/components";
import { Fragment } from "react";

const CustomerProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Fragment>
      <CustomerNavigationBar />
      {children}
      <Footer />
    </Fragment>
  );
};

export default CustomerProtectedLayout;
