import { H2, H6, H5 } from "@/components";
import UnclickableRating from "@/components/product/unclickable-rating";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

type Props = {
  review: Review;
};

const ReviewCard = (props: Props) => {
  const time = new Date(props.review.createdAt);

  const reviewPostTimeAgo = formatDistanceToNow(time, {
    addSuffix: true,
  })?.replace("about", "");

  return (
    <article className="flex flex-col gap-3">
      <span className="flex items-center gap-3 w-fit py-4 px-3 bg-gray rounded-lg">
        <div className="relative rounded-full bg-grey h-12 w-12 flex items-center justify-center">
          {props.review.from.profileImage ? (
            <Image
              src={props.review.from.profileImage}
              alt=""
              quality={100}
              fill
              sizes="any"
              className="rounded-full object-cover"
            />
          ) : (
            <H2>{props.review.from.firstName?.substring(0, 1)} </H2>
          )}
        </div>

        <span className="flex flex-col gap-1">
          <H5>
            {props.review.from.firstName} {props.review.from.lastName}{" "}
          </H5>

          <span className="flex gap-2 text-sm text-customblack">
            <UnclickableRating rating={props.review.rating} />

            <H6>{reviewPostTimeAgo}</H6>
          </span>
        </span>
      </span>

      <p className="text-sm leading-6 lg:text-base lg:leading-7">
        {props.review.message}
      </p>
    </article>
  );
};

export default ReviewCard;
