"use client";
import "@/app/globals.css";
import { useDispatch } from "react-redux";
import type { DispatchType } from "@/redux/store";
import { setOpenDropDown } from "@/redux/slices/modal";
import dynamic from "next/dynamic";

const LoginModal = dynamic(() => import("@/components/login-modal"), {
  ssr: false,
});
const SignupModal = dynamic(() => import("@/components/sign-up-modal"), {
  ssr: false,
});
const ErrorModal = dynamic(() => import("@/components/error-modal"), {
  ssr: false,
});

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch: DispatchType = useDispatch();

  return (
    <main
      onClick={() => dispatch(setOpenDropDown(false))}
      onKeyDown={() => dispatch(setOpenDropDown(false))}
    >
      {children}

      <LoginModal />

      <SignupModal />

      <ErrorModal />
    </main>
  );
}
