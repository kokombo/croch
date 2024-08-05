"use client";
import "@/app/globals.css";
import { useDispatch } from "react-redux";
import type { DispatchType } from "@/redux/store";
import { setOpenDropDown } from "@/redux/slices/modal";
import LoginModal from "@/components/login-modal";
import SignupModal from "@/components/sign-up-modal";
import ErrorModal from "@/components/error-modal";

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
