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
    <section className="flex flex-col gap-8">
      <H3>Explore other creatives by {creative?.brandName} </H3>

      <div className="flex flex-col gap-8 lg:gap-[60px] ">
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
          </div>
        )}
        <StyledLink
          href=""
          label="Show all products"
          className="border_black_1 text-customblack self-start lg:self-center"
        />
      </div>
    </section>
  );
};

export default CrossSellContainer;
