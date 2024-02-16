import Image from "next/image";
import { useState, TouchEvent } from "react";
import { RoundIconButton } from "..";

type Props = {
  sliderData: string[];
};

const Slider = (props: Props) => {
  const [index, setIndex] = useState(0);
  const [hideButton, setHideButton] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const swipeSlider = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStart) return;

    const delta = e.touches[0].clientX - touchStart;

    if (delta > 50) {
      setIndex(index === props.sliderData.length - 1 ? 0 : index - 1);
    } else if (delta < -50) {
      setIndex(
        index === props.sliderData.length - 1
          ? props.sliderData.length - 1
          : index + 1
      );
    }
  };

  return (
    <div
      className="relative overflow-hidden w-[300px] h-[200px]"
      onPointerEnter={() => setHideButton(false)}
      onPointerLeave={() => setHideButton(true)}
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchMove={swipeSlider}
      onTouchEnd={() => setTouchStart(null)}
    >
      <div className="flex">
        {props.sliderData?.map((data, sliderIndex) => {
          const opacity = index === sliderIndex ? "opacity-[1]" : "";

          return (
            <div
              key={sliderIndex}
              className={`relative h-[200px] w-full flex-shrink-0 transition-transform duration-500 ease-in-out ${opacity}`}
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              <Image
                key={sliderIndex}
                src={data}
                alt="slider-image"
                fill
                quality={100}
                loading="lazy"
                sizes="any"
              />
            </div>
          );
        })}

        {index > 0 && (
          <RoundIconButton
            hidden={hideButton}
            onClick={() => setIndex(index - 1)}
            label="Prev"
            extraClasses="absolute left-1 top-1/2 bg-white"
          />
        )}

        {index < props.sliderData.length - 1 && (
          <RoundIconButton
            hidden={hideButton}
            onClick={() => setIndex(index + 1)}
            label="Next"
            extraClasses="absolute right-1 top-1/2 bg-white"
          />
        )}
      </div>
    </div>
  );
};

export default Slider;
