"use client";

import "../globals.css";
import { Modal, LoginForm, SignupForm, H5 } from "@/components";
import { icons } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "@/redux/store";
import {
  setOpenLoginModal,
  setOpenSignupModal,
  setOpenDropDown,
} from "@/redux/slices/modal";
import { useState, Fragment } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [step, setStep] = useState(1);

  const { openLoginModal, openSignupModal, openErrorModal, errorMessage } =
    useSelector((state: StateType) => state.modal);

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
    <Fragment>
      <main onClick={() => dispatch(setOpenDropDown(false))}>{children}</main>

      <Fragment>
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

        {openErrorModal && (
          <div className="fixed left-1 bottom-10 card z-[100] h-fit w-[350px]">
            <H5> {errorMessage}</H5>
          </div>
        )}
      </Fragment>
    </Fragment>
  );
}
