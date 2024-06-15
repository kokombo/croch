import Image from "next/image";
import { useState, TouchEvent } from "react";
import { RoundIconButton } from "../buttons";
import {
  ProductAvailability,
  ProductCardOwnerInfo,
  AddToWishlist,
} from "../product";
import { icons } from "@/constants";
import { twMerge } from "tailwind-merge";

type Props = {
  showButton: boolean;
  product: Product;
};

const Slider = (props: Props) => {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [offSet, setOffSet] = useState(0);

  const swipeSlide = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStart === 0) return;
    const delta = e.touches[0].clientX - touchStart;
    setOffSet(delta);
  };

  const handleTouchEnd = () => {
    if (offSet > 50 && index > 0) {
      setIndex(index - 1);
    } else if (offSet < -50 && index < props.product.photos.length) {
      setIndex(
        index === props.product.photos.length - 1
          ? props.product.photos.length - 1
          : index + 1
      );
    } else {
      setTouchStart(0);
      setOffSet(0);
    }
  };

  return (
    <div
      className="relative overflow-hidden w-full h-[310px] md:h-[270px] rounded-lg"
      onTouchStart={(e) => {
        setTouchStart(e.touches[0].clientX);
        setOffSet(0);
      }}
      onTouchMove={swipeSlide}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex">
        {props.product.photos?.map((photo, sliderIndex) => {
          const opacity = index === sliderIndex ? "opacity-[1]" : "";

          return (
            <div
              key={sliderIndex}
              className={twMerge(
                "w-full flex-shrink-0 transition-transform duration-400 ease-in-out bg-grey",
                opacity
              )}
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              <div className="relative h-[310px] md:h-[270px] ">
                <Image
                  key={sliderIndex}
                  src={photo}
                  alt=""
                  fill
                  quality={100}
                  loading={sliderIndex > 1 ? "lazy" : "eager"}
                  priority={sliderIndex < 2}
                  sizes="any"
                  decoding="async"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}

        <ProductAvailability
          product={props.product}
          extraClasses="absolute left-[5%] top-4"
        />

        <AddToWishlist
          extraClasses="absolute right-[5%] top-4"
          notInWishlistIcon={icons.bookmark}
          alreadyInWishlistIcon={icons.redheart}
          productId={props.product._id}
        />

        {props.showButton && index > 0 && (
          <RoundIconButton
            onClick={(e) => {
              e.preventDefault();
              setIndex(index - 1);
            }}
            label={
              <Image
                src={icons.chevronleft}
                alt="chevron prev button icon"
                height={10}
                width={6}
                priority
              />
            }
            extraClasses="absolute left-[5%] top-1/2 bg-white"
            arialabel="Slider prev button"
          />
        )}

        {props.showButton && index < props.product.photos.length - 1 && (
          <RoundIconButton
            onClick={(e) => {
              e.preventDefault();
              setIndex(index + 1);
            }}
            label={
              <Image
                src={icons.chevronright}
                alt="chevron-next-button-icon"
                height={10}
                width={6}
                priority
              />
            }
            extraClasses="absolute right-[5%] top-1/2 bg-white"
            arialabel="Slider next button"
          />
        )}

        <ProductCardOwnerInfo
          product={props.product}
          extraClasses="absolute bottom-4 right-[5%] left-[5%] "
        />

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-[2px]">
          {[...Array(props.product.photos.length)].map((_, dotIndex) => {
            return (
              <div key={dotIndex} className="relative h-[6px] w-[6px]">
                <Image
                  src={index === dotIndex ? icons.activedot : icons.inactivedot}
                  alt=""
                  fill
                  loading="eager"
                  quality={100}
                  sizes="any"
                  className="object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
