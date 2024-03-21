"use client";
import {
  Logo,
  Hero,
  About,
  CreativesTestimonial,
  HowItWorks,
  WhyUs,
  CustomButton,
} from "@/components";
import { useCurrentUser } from "@/utilities";
import { setOpenLoginModal } from "@/redux/slices/modal";
import { useDispatch } from "react-redux";
import { DispatchType } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";

const CreativeLanding = () => {
  const { session, id } = useCurrentUser();

  const router = useRouter();

  const dispatch: DispatchType = useDispatch();

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
    </main>
  );
};

export default CreativeLanding;
