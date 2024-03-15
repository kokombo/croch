import { CustomButton } from "@/components";
import CreativeInfo from "../creative-info";

type Props = {
  creative: Creative;
  product: Product;
};

const ProductOwnerCard = (props: Props) => {
  return (
    <div className="flex flex-col gap-8 border-[1px] border-grey rounded-xl p-7">
      <div className="flex justify-between items-center">
        <CreativeInfo creative={props.creative} product={props.product} />

        <CustomButton
          label="Contact Creative"
          onClick={() => {}}
          type="button"
          extraClasses="text-black border-black border-[2px] px-4 py-4"
        />
      </div>

      <span>
        <p>{props.creative.personalDescription}</p>
      </span>

      <div>
        <h3 className="text-xl font-bold">Fun Facts</h3>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {props.creative.funFacts.map((funFact, index) => {
            return (
              <article
                key={index}
                className="py-3 px-4 border-[1px] border-grey rounded-xl text-sm"
              >
                {funFact}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductOwnerCard;
