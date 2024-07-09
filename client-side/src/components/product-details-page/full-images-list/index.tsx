import Image from "next/image";
import { icons } from "@/constants";
import type { Dispatch, SetStateAction } from "react";
import { H4 } from "@/components";

type Props = {
  photos: string[];
  showMorePhotos: boolean;
  setShowMorePhotos: Dispatch<SetStateAction<boolean>>;
};

const FullImagesList = (props: Props) => {
  return (
    <div
      className={`fixed top-0 left-0 flex items-start md:justify-center w-full h-full z-[9999] inset-0 transform ${props.showMorePhotos ? "translate-y-0" : "translate-y-full"} duration-500 ease-in-out`}
    >
      <div
        className="w-full h-full bg-white px-8 overflow-y-scroll"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="py-7 flex items-center justify-between sticky top-0 left-0 z-[100] bg-white">
          <button
            type="button"
            onClick={() => {
              props.setShowMorePhotos(false);
              document.body.style.overflow = "auto";
            }}
            className="hover:bg-gray h-10 w-10 rounded-full flex items-center justify-center"
          >
            <Image src={icons.chevronleft} alt="" width={7.7} height={13.3} />
          </button>

          <H4>All Photos</H4>

          <div />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-5 mb-10 ">
          {props.photos.map((photo) => {
            return (
              <div key={photo} className="relative w-full h-[204px] bg-grey">
                <Image
                  src={photo}
                  alt=""
                  fill
                  loading="lazy"
                  quality={100}
                  className="object-cover"
                  sizes="any"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FullImagesList;
