import { CustomButton, H3, ReviewCard } from "@/components";
import { useGetCreativeReviews } from "@/utilities/api-interactions/review";

const ReviewsList = ({ creativeId }: { creativeId: string }) => {
  const { data: reviews, isSuccess } = useGetCreativeReviews(creativeId);

  return (
    <>
      {isSuccess && reviews && reviews?.length > 0 && (
        <section className="flex flex-col gap-8">
          <span>
            <H3>Reviews</H3>
          </span>

          <div className="flex flex-col gap-10 lg:gap-15 w-full lg:w-[58%]">
            {reviews?.map((review) => {
              return <ReviewCard key={review._id} review={review} />;
            })}
          </div>

          {/* Only show below when reviews length is more than 4. Implement later */}
          <span>
            <CustomButton
              type="button"
              label={`Show all ${reviews.length} reviews`}
              onClick={() => {}}
              extraClasses="border-[1px] border-black px-7 py-5"
            />
          </span>
        </section>
      )}
    </>
  );
};

export default ReviewsList;
