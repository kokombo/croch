"use client";

import "../globals.css";
import { Modal, LoginForm, SignupForm } from "@/components";
import { icons } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "@/redux/store";
import { setOpenLoginModal, setOpenSignupModal } from "@/redux/slices/modal";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [step, setStep] = useState(1);

  const { openLoginModal, openSignupModal } = useSelector(
    (state: StateType) => state.modal
  );

  const dispatch: DispatchType = useDispatch();

  const onClickSignupModalButton = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      dispatch(setOpenSignupModal(false));
      setStep(1);
      document.body.style.overflow = "auto";
    }
  };

  return (
    <>
      {children}

      {openLoginModal && (
        <Modal
          closeModal={() => dispatch(setOpenLoginModal(false))}
          onClickModalButton={() => {
            dispatch(setOpenLoginModal(false));
            document.body.style.overflow = "auto";
          }}
          icon={icons.close}
          label="Log in"
        >
          <LoginForm />
        </Modal>
      )}

      {openSignupModal && (
        <Modal
          closeModal={() => {
            dispatch(setOpenSignupModal(false));
            setStep(1);
          }}
          onClickModalButton={onClickSignupModalButton}
          icon={step > 1 ? icons.arrowleft : icons.close}
          label={
            step === 1
              ? "Sign up"
              : step === 2
                ? "Sign up"
                : step === 3
                  ? "Personal Details"
                  : step === 4
                    ? "Create Password"
                    : ""
          }
        >
          <SignupForm step={step} setStep={setStep} />
        </Modal>
      )}
    </>
  );
}
