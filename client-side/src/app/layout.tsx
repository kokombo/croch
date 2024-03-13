"use client";

import {
  ReactQueryProvider,
  NextAuthProvider,
  RedirectCreative,
} from "@/components";
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
            <ReactQueryProvider>
              <RedirectCreative>{children}</RedirectCreative>
            </ReactQueryProvider>
          </NextAuthProvider>
        </Provider>
      </body>
    </html>
  );
}
