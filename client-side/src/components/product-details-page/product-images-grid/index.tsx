import { icons } from "@/constants";
import Image from "next/image";
import { useState } from "react";
import FullImagesList from "../full-images-list";

const ProductImagesGrid = ({ photos }: { photos: string[] }) => {
  const [showMorePhotos, setShowMorePhotos] = useState(false);

  return (
    <>
      <div className="grid grid-rows-2 lg:grid-rows-none grid-cols-none lg:grid-cols-2 gap-2">
        <div className="relative h-[356px] lg:h-[428px] w-full bg-grey rounded-t-xl lg:rounded-tr-none lg:rounded-l-[20px]">
          <Image
            src={photos[0]}
            alt=""
            fill
            loading="lazy"
            quality={100}
            sizes="any"
            decoding="async"
            className="rounded-t-xl lg:rounded-tr-none lg:rounded-l-[20px] object-cover hover:brightness-90"
          />
        </div>

        <div className="grid grid-rows-2 gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="relative w-full bg-grey">
              <Image
                src={photos[1]}
                alt=""
                fill
                loading="lazy"
                quality={100}
                sizes="any"
                decoding="async"
                className="object-cover hover:brightness-90"
              />
            </div>

            <div className="relative w-full bg-grey lg:rounded-tr-[20px]">
              <Image
                src={photos[2]}
                alt=""
                fill
                loading="lazy"
                quality={100}
                decoding="async"
                sizes="any"
                className="lg:rounded-tr-[20px] object-cover hover:brightness-90"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="relative w-full bg-grey rounded-bl-xl lg:rounded-bl-none ">
              <Image
                src={photos[3]}
                alt=""
                fill
                loading="lazy"
                quality={100}
                decoding="async"
                sizes="any"
                className="rounded-bl-xl lg:rounded-bl-none object-cover hover:brightness-90"
              />
            </div>

            <div className="relative w-full bg-grey rounded-br-xl lg:rounded-br-[20px]">
              <Image
                src={photos[4]}
                alt=""
                fill
                loading="lazy"
                quality={100}
                sizes="any"
                className="rounded-br-xl lg:rounded-br-[20px] object-cover hover:brightness-90 "
              />

              {photos.length > 5 && (
                <button
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    setShowMorePhotos(true);
                  }}
                  className="text-black bg-white border-black border-[1px] rounded-[8px] py-[9px] px-2 lg:px-4 absolute bottom-2 right-1 lg:right-6 lg:bottom-6"
                >
                  <span className="flex items-center gap-1 lg:gap-2">
                    <Image src={icons.morephoto} alt="" className="h-4 w-4" />
                    <p className="text-xs md:text-sm font-medium">
                      Show more photos
                    </p>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {photos.length > 5 && (
        <FullImagesList
          photos={photos}
          showMorePhotos={showMorePhotos}
          setShowMorePhotos={setShowMorePhotos}
        />
      )}
    </>
  );
};

export default ProductImagesGrid;
