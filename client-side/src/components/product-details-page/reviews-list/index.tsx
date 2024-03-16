import { CustomButton } from "@/components";
import Review from "../review";

const ReviewsList = () => {
  return (
    <section className="flex flex-col gap-11 py-10">
      <span>
        <h3 className="text-xl font-bold">Reviews</h3>
      </span>

      <div className="flex flex-col gap-[60px] w-[58%]">
        {[...Array(4)].map((_, index) => {
          return <Review key={index} />;
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
  );
};

export default ReviewsList;
