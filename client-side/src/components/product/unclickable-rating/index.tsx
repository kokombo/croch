import { Fragment, useId } from "react";
import { icons } from "@/constants";
import Image from "next/image";
import { H6 } from "../..";

const UnclickableRating = ({ rating }: { rating: number }) => {
  const id = useId();

  return (
    <Fragment>
      {rating && rating > 1 && (
        <span className="flex gap-[2px]">
          <H6>{rating}</H6>

          <span className="flex">
            {[
              ...Array(Number.parseInt(rating?.toString().substring(0, 1))),
            ].map((_) => {
              return (
                <Image
                  key={id}
                  src={icons.star}
                  alt=""
                  width={16}
                  height={16}
                  priority
                  className="object-contain"
                  sizes="100vw"
                  quality={100}
                />
              );
            })}
          </span>
        </span>
      )}
    </Fragment>
  );
};

export default UnclickableRating;
