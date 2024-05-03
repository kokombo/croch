import { CustomButton } from "@/components/buttons";
import images from "@/constants/images";
import Image from "next/image";

const About = () => {
  return (
    <section className="px-[8%] py-16 flex_item_justify_between">
      <div className="flex gap-3 w-[49.5%]">
        <span className="flex flex-col gap-3 w-[49%]">
          <div className="relative w-full h-[298px]">
            <Image
              src={images.croch1}
              alt="croch-design-1"
              fill
              quality={100}
              priority
              sizes="any"
              className="rounded-[30px] object-cover"
            />
          </div>

          <div className="relative w-full h-[298px]">
            <Image
              src={images.croch3}
              alt="croch-design-3"
              fill
              quality={100}
              priority
              sizes="any"
              className="rounded-[30px] object-cover"
            />
          </div>
        </span>

        <span className="flex flex-col gap-3 w-[49%] mt-11">
          <div className="relative w-full h-[298px]">
            <Image
              src={images.croch2}
              alt="croch-design-2"
              fill
              quality={100}
              priority
              sizes="any"
              className="rounded-[30px] object-cover"
            />
          </div>
          <div className="relative w-full h-[298px]">
            <Image
              src={images.croch4}
              alt="croch-design-4"
              fill
              quality={100}
              priority
              sizes="any"
              className="rounded-[30px] object-cover"
            />
          </div>
        </span>
      </div>

      <div className="flex flex-col gap-8 w-[43.5%]">
        <article className="flex flex-col gap-4">
          <h3 className="font-bold tracking-[16%] text-grey2">{text.text1}</h3>

          <h2 className="text-5xl leading-[64px] font-bold">{text.text2}</h2>

          <h4 className="text-xl leading-9 font-medium text-grey3">
            {text.text3}
          </h4>

          <h4 className="text-xl leading-9 font-medium text-grey3">
            {text.text4}
          </h4>
        </article>

        <span>
          <CustomButton
            type="button"
            label="Start Selling"
            extraClasses="py-[10px] px-10 bg-black text-white"
          />
        </span>
      </div>
    </section>
  );
};

export default About;

const text = {
  text1: "More than just a marketplace",
  text2: "We believe in the power of handmade wonders",
  text3:
    "We believe in fair compensation for your talent. Our transparent commission structure ensures that you reap the rewards of your hard work, allowing you to focus on what you do best—creating",
  text4:
    "Beyond a marketplace, we're a community. Connect with like-minded individuals, exchange ideas, and be inspired by the diverse tapestry of creativity within our community.",
};
