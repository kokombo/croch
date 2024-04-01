import { icons } from "@/constants";
import Image from "next/image";
import { H6 } from "..";

const UnclickableRating = ({ rating }: { rating: number }) => {
  return (
    <>
      {rating && rating > 1 && (
        <span className="flex gap-[2px]">
          <H6>{rating}</H6>

          <span className="flex">
            {[...Array(parseInt(rating?.toString().substring(0, 1)))].map(
              (_, index) => {
                return (
                  <Image
                    key={index}
                    src={icons.star}
                    alt=""
                    width={16}
                    height={16}
                    priority
                    className="object-contain"
                  />
                );
              }
            )}
          </span>
        </span>
      )}
    </>
  );
};

export default UnclickableRating;
