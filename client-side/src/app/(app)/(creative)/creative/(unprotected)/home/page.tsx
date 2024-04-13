"use client";

import {
  Logo,
  Hero,
  About,
  CreativesTestimonial,
  HowItWorks,
  WhyUs,
  CustomButton,
  Footer,
} from "@/components";
import { useCurrentUser } from "@/utilities";
import { setOpenLoginModal } from "@/redux/slices/modal";
import { useDispatch } from "react-redux";
import { DispatchType } from "@/redux/store";
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
      document.body.style.overflow = "hidden";
    } else if (isCreative) {
      if (creative?.accountSetupDone) {
        router.push(
          `/creative/dashboard/${creative?.brandName.toLowerCase()}~${creative?._id.substring(0, 16)}`
        );
      } else {
        router.push("/creative/become-a-creative");
      }
    } else {
      router.push("/");
    }
  };

  return (
    <main>
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

      <Footer />
    </main>
  );
};

export default CreativeLanding;
