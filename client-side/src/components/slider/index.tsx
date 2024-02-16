import Image from "next/image";
import { useState } from "react";
import { RoundIconButton } from "..";

type Props = {
  sliderData: string[];
};

const Slider = (props: Props) => {
  const [index, setIndex] = useState(0);
  const [hideButtons, setHideButtons] = useState(true);

  const transition = `transition-transform duration-500 ease-in-out`;

  const activeSlide = `translate-x-0 opacity-[1] ${transition}`;
  const nextSlide = `translate-x-full ${transition}`;
  const prevSlide = `-translate-x-full${transition}`;

  return (
    <div
      className="relative h-[200px] w-[300px] overflow-hidden"
      onPointerEnter={() => setHideButtons(false)}
      onPointerLeave={() => setHideButtons(true)}
      onTouchStart={() => setHideButtons(false)}
      onTouchEnd={() => setHideButtons(true)}
    >
      {props.sliderData?.map((data, sliderIndex) => {
        let position = nextSlide;

        if (sliderIndex === index) position = activeSlide;

        if (sliderIndex === index - 1) position = prevSlide;

        return (
          <Image
            key={sliderIndex}
            src={data}
            alt="slider-image"
            fill
            quality={100}
            loading="lazy"
            className={position}
          />
        );
      })}

      {index > 0 && (
        <RoundIconButton
          hidden={hideButtons}
          onClick={() => setIndex(index + 1)}
          label="Prev"
          extraClasses="absolute left-1 top-1/2 bg-white"
        />
      )}

      {index < props.sliderData.length - 1 && (
        <RoundIconButton
          hidden={hideButtons}
          onClick={() => setIndex(index + 1)}
          label="Next"
          extraClasses="absolute right-1 top-1/2 bg-white"
        />
      )}
    </div>
  );
};

export default Slider;
