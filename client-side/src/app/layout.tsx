"use client";

import { ReactQueryProvider, NextAuthProvider } from "@/components";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <NextAuthProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NextAuthProvider>
        </Provider>
      </body>
    </html>
  );
}
