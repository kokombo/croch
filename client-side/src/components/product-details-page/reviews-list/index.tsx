import { CustomButton, ReviewCard } from "@/components";
import { useGetCreativeReviews } from "@/utilities/api-interactions/review";

const ReviewsList = ({ creativeId }: { creativeId: string }) => {
  const { data: reviews, isSuccess } = useGetCreativeReviews(creativeId);

  return (
    <>
      {isSuccess && reviews && reviews?.length > 1 && (
        <section className="flex flex-col gap-11 py-10">
          <span>
            <h3 className="text-xl font-bold">Reviews</h3>
          </span>

          <div className="flex flex-col gap-[60px] w-[58%]">
            {reviews?.map((review) => {
              return <ReviewCard key={review._id} review={review} />;
            })}
          </div>

          <span>
            <CustomButton
              type="button"
              label="Show all 24 reviews"
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
