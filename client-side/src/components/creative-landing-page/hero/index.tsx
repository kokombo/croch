import { CustomButton } from "@/components";
import images from "@/constants/images";
import Image from "next/image";

const Hero = () => {
  return (
    <header className="px-[8%] py-16 flex_item_justify_between">
      <div className="flex flex-col gap-[25px] w-[49.5%]">
        <article className="flex flex-col gap-4">
          <h3 className="tracking-[16%] font-bold text-grey2">{text.text1}</h3>

          <h2 className="text-5xl leading-[64px] font-bold">{text.text2}</h2>

          <h4 className="text-xl leading-9 font-medium text-grey3">
            {text.text3}
          </h4>
        </article>

        <span className=" flex items-center gap-6">
          <CustomButton
            type="button"
            label="Start Selling"
            extraClasses="py-[10px] px-10 bg-black text-white"
          />

          <CustomButton
            type="button"
            label="Learn More"
            extraClasses="py-[10px] px-10 border-black border-[1px]"
          />
        </span>
      </div>

      <div className="relative h-[598px] w-[43.5%]">
        <Image
          src={images.hero}
          alt="creative-landing-page-hero-image"
          fill
          quality={100}
          priority
          loading="eager"
          className="rounded-3xl object-cover"
          sizes="any"
        />
      </div>
    </header>
  );
};

export default Hero;

const text = {
  text1: "Welcome to Croch",
  text2: "Where Your Crochet Creations and products Shine!",
  text3:
    "Are you a crochet enthusiast with a knack for turning yarn into masterpieces? Look no further – croch is the perfect canvas for your creative endeavors!",
};
