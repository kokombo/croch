"use client";

import {
  Logo,
  Modal,
  LoginForm,
  SignupForm,
  Hero,
  About,
  CreativesTestimonial,
  HowItWorks,
  WhyUs,
  CustomButton,
} from "@/components";
import { useCurrentUser } from "@/utilities";
import { setOpenLoginModal, setOpenSignupModal } from "@/redux/slices/modal";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "@/redux/store";
import { useState } from "react";
import { icons } from "@/constants";
import { useRouter } from "next/navigation";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";

const CreativeLanding = () => {
  const [step, setStep] = useState(1);

  const { session, id, role } = useCurrentUser();

  const router = useRouter();

  const dispatch: DispatchType = useDispatch();

  const { openLoginModal, openSignupModal } = useSelector(
    (state: StateType) => state.modal
  );

  const { data: creative } = useGetCreativeById(id);

  const initiateAccountSetup = () => {
    if (!session) {
      dispatch(setOpenLoginModal(true));
      document.body.style.overflow = "hidden";
    } else if (!creative?.accountSetupDone) {
      router.push("/creative/become-a-creative");
    } else {
      router.push("/creative/dashboard");
    }
  };

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
    <main>
      <nav className="flex items-center justify-between py-[18px] px-[8%]">
        <Logo />

        <CustomButton
          label="Croch Store Setup"
          extraClasses="bg-black text-white px-10 py-4"
          onClick={initiateAccountSetup}
          type="button"
        />
      </nav>

      <Hero />

      <About />

      <HowItWorks />

      <WhyUs />

      <CreativesTestimonial />

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
    </main>
  );
};

export default CreativeLanding;
