"use client";
import { ReactQueryProvider, NextAuthProvider } from "@/components";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Montserrat } from "next/font/google";
import { MacanRegular } from "./font";

const montserrat = Montserrat({
  subsets: ["latin-ext"],
  weight: "400",
  style: "normal",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={MacanRegular.className}>
        <Provider store={store}>
          <NextAuthProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NextAuthProvider>
        </Provider>
      </body>
    </html>
  );
}
