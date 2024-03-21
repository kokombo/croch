import { icons } from "@/constants";
import Image from "next/image";
import { useState } from "react";
import FullImagesList from "../full-images-list";

const ProductImagesGrid = ({ photos }: { photos: string[] }) => {
  const [showMorePhotos, setShowMorePhotos] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 h-[428px] gap-3">
        <div className="relative w-full bg-grey rounded-l-[20px]">
          <Image
            src={photos[0]}
            alt=""
            fill
            loading="lazy"
            quality={100}
            sizes="any"
            decoding="async"
            className="rounded-l-[20px] object-cover hover:brightness-90"
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

            <div className="relative w-full bg-grey rounded-tr-[20px]">
              <Image
                src={photos[2]}
                alt=""
                fill
                loading="lazy"
                quality={100}
                decoding="async"
                sizes="any"
                className="rounded-tr-[20px] object-cover hover:brightness-90"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="relative w-full bg-grey">
              <Image
                src={photos[3]}
                alt=""
                fill
                loading="lazy"
                quality={100}
                decoding="async"
                sizes="any"
                className="object-cover hover:brightness-90"
              />
            </div>

            <div className="relative w-full bg-grey rounded-br-[20px]">
              <Image
                src={photos[4]}
                alt=""
                fill
                loading="lazy"
                quality={100}
                sizes="any"
                className="rounded-br-[20px] object-cover hover:brightness-90 "
              />

              {photos.length > 5 && (
                <button
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    setShowMorePhotos(true);
                  }}
                  className="text-black bg-white border-black border-[1px] rounded-[8px] py-[9px] px-4 absolute right-6 bottom-6"
                >
                  <span className="flex items-center gap-2">
                    <Image src={icons.morephoto} alt="" className="h-4 w-4" />
                    <p className="text-sm font-medium"> Show more photos</p>
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
