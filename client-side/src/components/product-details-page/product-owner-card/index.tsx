import { CustomButton, ThreeDotsLoader } from "@/components";
import CreativeInfo from "../creative-info";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";

type Props = {
  product: Product;
};

const ProductOwnerCard = (props: Props) => {
  const {
    data: creative,
    isLoading,
    isError,
    error,
  } = useGetCreativeById(props.product.owner._id);

  return (
    <div className="flex flex-col gap-8 border-[1px] border-grey rounded-xl p-7">
      {isLoading || isError || !creative ? (
        <div className="h-[200px]">
          <ThreeDotsLoader />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <CreativeInfo creative={creative} />

            <CustomButton
              label="Contact Creative"
              onClick={() => {}}
              type="button"
              extraClasses="text-black border-black border-[2px] px-4 py-4"
            />
          </div>

          <span>
            <p>{creative?.personalDescription}</p>
          </span>

          <div>
            <h3 className="text-xl font-bold">Fun Facts</h3>

            <div className="grid grid-cols-3 gap-4 mt-5">
              {creative?.funFacts.map((funFact, index) => {
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
        </>
      )}
    </div>
  );
};

export default ProductOwnerCard;
