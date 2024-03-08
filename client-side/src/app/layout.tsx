"use client";

import {
  ReactQueryProvider,
  NextAuthProvider,
  NavigationBar,
} from "@/components";

import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <NextAuthProvider>
            <ReactQueryProvider>
              <NavigationBar />

              {children}
            </ReactQueryProvider>
          </NextAuthProvider>
        </Provider>
      </body>
    </html>
  );
}
