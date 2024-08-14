import { useState } from "react";
import { setOpenSignupModal } from "@/redux/slices/modal";
import type { DispatchType, StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { icons } from "@/constants";
import { createPortal } from "react-dom";
import Modal from "../modal";
import SignupForm from "../forms/signup-form";

const SignupModal = () => {
  const [step, setStep] = useState(1);
  const { isSignupModalOpen } = useSelector((state: StateType) => state.modal);
  const dispatch: DispatchType = useDispatch();

  const onClickSignupModalButton = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      dispatch(setOpenSignupModal(false));
      setStep(1);
    }
  };

  return createPortal(
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
      isModalOpen={isSignupModalOpen}
    >
      <SignupForm step={step} setStep={setStep} />
    </Modal>,
    document.body
  );
};

export default SignupModal;
