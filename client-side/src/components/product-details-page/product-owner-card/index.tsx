import { CustomButton, H3, H6, ThreeDotsLoader } from "@/components";
import CreativeInfo from "../creative-info";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import Image from "next/image";
import { icons } from "@/constants";
import Link from "next/link";

type Props = {
  product: Product;
};

const ProductOwnerCard = (props: Props) => {
  const {
    data: creative,
    isLoading,
    isError,
    error,
  } = useGetCreativeById(props.product.owner._id, true);

  return (
    <div className="border-[1px] border-grey rounded-xl p-4 lg:p-7">
      {isLoading || isError || !creative ? (
        <div className="h-[200px]">
          <ThreeDotsLoader />
        </div>
      ) : (
        <div className="flex flex-col gap-8 ">
          <span className="flex_col_start gap-1 lg:gap-2 xl:gap-0 xl:flex-row xl:justify-between">
            <CreativeInfo creative={creative} />

            <CustomButton
              label="Contact Creative"
              onClick={() => {}}
              type="button"
              extraClasses="text-black border_black_1 py-3 px-4 py-4 text-sm self-center"
            />
          </span>

          <span>
            <p className="text-sm leading-6 lg:text-base lg:leading-7">
              {creative?.personalDescription}
            </p>
          </span>

          <div className=" flex flex-col gap-2">
            <H3>Fun Facts</H3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">
              {creative?.funFacts.map((funFact, index) => {
                return (
                  <article
                    key={index}
                    className="flex flex-col gap-2 p-3 border-[1px] border-grey rounded-xl h-fit min-h-[140px] md:min-h-[180px] lg:min-h-[200px] xl:min-h-[240px] shadow bg-whitee"
                  >
                    <Image
                      src={
                        index === 0
                          ? icons.funfact1
                          : index === 1
                            ? icons.funfact2
                            : index === 2
                              ? icons.funfact3
                              : ""
                      }
                      alt=""
                      height={40}
                      width={40}
                      loading="eager"
                      sizes="any"
                      className="object-contain"
                    />

                    <H6>{funFact} </H6>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOwnerCard;
