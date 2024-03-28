import { H6, UnclickableRating } from "@/components";
import Image from "next/image";

type Props = {
  review: Review;
};

const ReviewCard = (props: Props) => {
  return (
    <article className="flex flex-col gap-3">
      <span className="flex items-center gap-3 w-fit py-2 px-3 bg-gray rounded-lg">
        <div className="relative rounded-full bg-grey h-10 w-10">
          <Image
            src={props.review.from.profileImage}
            alt=""
            quality={100}
            fill
            sizes="any"
            className="rounded-full object-cover"
          />
        </div>

        <span>
          <H6>
            {props.review.from.firstName} {props.review.from.lastName}{" "}
          </H6>

          <span className="flex gap-2 text-sm text-customblack">
            <UnclickableRating rating={props.review.rating} />

            <h6>{props.review.createdAt}</h6>
          </span>
        </span>
      </span>

      <p className="text-base font-normal">{props.review.message}</p>
    </article>
  );
};

export default ReviewCard;
