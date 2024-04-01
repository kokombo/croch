import { CustomButton, H3, ThreeDotsLoader } from "@/components";
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
    <div className="flex flex-col gap-8 border-[1px] border-grey rounded-xl p-4 lg:p-7">
      {isLoading || isError || !creative ? (
        <div className="h-[200px]">
          <ThreeDotsLoader />
        </div>
      ) : (
        <>
          <span className="flex flex-col items-start gap-2 xl:gap-0 xl:flex-row xl:justify-between xl:items-center">
            <CreativeInfo creative={creative} />

            <CustomButton
              label="Contact Creative"
              onClick={() => {}}
              type="button"
              extraClasses="text-black border_black_1 px-4 py-4 text-sm self-end"
            />
          </span>

          <span>
            <p className="text-sm leading-6 lg:text-base lg:leading-7">
              {creative?.personalDescription}
            </p>
          </span>

          <div>
            <H3>Fun Facts</H3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
              {creative?.funFacts.map((funFact, index) => {
                return (
                  <article
                    key={index}
                    className="py-2 px-3 border-[1px] border-grey rounded-xl text-sm h-fit min-h-[120px] lg:min-h-[250px] xl:min-h-[200px]"
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
