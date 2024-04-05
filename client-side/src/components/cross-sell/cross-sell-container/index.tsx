import { useGetAllProducts } from "@/utilities/api-interactions/product";
import CrossSellCard from "../cross-sell-card";
import { H3, StyledLink } from "@/components";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import { useGetCreativeAllProducts } from "@/utilities/api-interactions/customer";

type Props = {
  creativeId: string;
  productId: string;
};

const CrossSellContainer = (props: Props) => {
  const { data: creative } = useGetCreativeById(props.creativeId, true);

  const { data: products } = useGetCreativeAllProducts(props.creativeId);

  return (
    <section className="flex flex-col gap-8 py-5 lg:py-10 mb-5 lg:mb-10">
      <H3>Explore other creatives by {creative?.brandName} </H3>

      <div className="flex flex-col gap-8 lg:gap-[60px] ">
        {/* className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
        gap-4" */}
        {/* flex_center gap-4 overflow-x-auto max-w-full; */}

        {products && (
          <div className="flex flex-col gap-6">
            <div
              className="cross_sell_products_wrapper"
              style={{ scrollbarWidth: "none" }}
            >
              {products
                ?.filter((product) => product._id !== props.productId)
                .slice(0, 4)
                .map((product) => {
                  return <CrossSellCard key={product._id} product={product} />;
                })}
            </div>

            {/*BELOW TO BE CHANGED LATER: Only display below if cross sell products length is more than 4*/}

            <div
              className="cross_sell_products_wrapper"
              style={{ scrollbarWidth: "none" }}
            >
              {products
                ?.filter((product) => product._id !== props.productId)
                .slice(0, 4)
                .map((product) => {
                  return <CrossSellCard key={product._id} product={product} />;
                })}
            </div>
          </div>
        )}
        <StyledLink
          href=""
          label="Show all products"
          extraClasses="border_black_1 text-customblack self-start lg:self-center"
        />
      </div>
    </section>
  );
};

export default CrossSellContainer;
