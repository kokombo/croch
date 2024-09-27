"use client";

import { Logo, Footer } from "@/components";
import { CustomButton } from "@/components/buttons";
import {
  Hero,
  About,
  CreativesTestimonial,
  HowItWorks,
  WhyUs,
} from "@/components/creative-landing-page";
import { useCurrentUser } from "@/utilities";
import { setOpenLoginModal } from "@/redux/slices/modal";
import { useDispatch } from "react-redux";
import type { DispatchType } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";

const CreativeLanding = () => {
  const { session, id, isCreative } = useCurrentUser();

  const router = useRouter();

  const dispatch: DispatchType = useDispatch();

  const { data: creative } = useGetCreativeById(id, true);

  const initiateAccountSetup = () => {
    if (!session) {
      dispatch(setOpenLoginModal(true));
    } else if (isCreative) {
      if (creative?.accountSetupDone) {
        router.push(
          `/creative/dashboard/${creative?.brandName.toLowerCase()}~${creative?._id.substring(
            0,
            16
          )}`
        );
      } else {
        router.push("/creative/become-a-creative");
      }
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <nav className="flex items-center justify-between py-[18px] paddingX">
        <Logo />

        <CustomButton
          label={
            !session
              ? "Croch Store Setup"
              : isCreative
              ? "Proceed"
              : "Go to marketplace"
          }
          className="bg-black text-white px-10 py-4"
          onClick={initiateAccountSetup}
          type="button"
        />
      </nav>

      <Hero />

      <About />

      <HowItWorks />

      <WhyUs />

      <CreativesTestimonial />

      <Footer />
    </div>
  );
};

export default CreativeLanding;
