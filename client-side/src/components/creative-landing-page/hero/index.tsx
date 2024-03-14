import { CustomButton } from "@/components";
import images from "@/constants/images";
import Image from "next/image";

const Hero = () => {
  return (
    <header className="px-[4.6%] py-16 grid grid-cols-2">
      <div className="flex flex-col gap-[25px]">
        <span className="flex flex-col gap-4">
          <h3 className="font-bold tracking-[16%] text-grey2">
            Welcome to Croch
          </h3>

          <h2 className="text-3xl font-bold">
            Where Your Crochet Creations and products Shine!
          </h2>

          <h4 className="text-xl leading-[34px] font-bold text-grey3">
            Are you a crochet enthusiast with a knack for turning yarn into
            masterpieces? Look no further – croch is the perfect canvas for your
            creative endeavors!
          </h4>
        </span>
        <span className=" flex items-center gap-6">
          <CustomButton
            type="button"
            label="Start selling"
            extraClasses="py-[10px] px-10 bg-black text-white"
          />

          <CustomButton
            type="button"
            label="Learn More"
            extraClasses="py-[10px] px-10 border-black border-[1px]"
          />
        </span>
      </div>

      <div>
        <div className="relative h-[698px] w-full rounded-b-3xl">
          <Image
            src={images.hero}
            alt="creative landing page hero image"
            fill
            quality={100}
            priority
            className="rounded-b-3xl"
            sizes="any"
          />
        </div>
      </div>
    </header>
  );
};

export default Hero;
