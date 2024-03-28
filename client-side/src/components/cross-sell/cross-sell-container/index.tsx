import { useGetAllProducts } from "@/utilities/api-interactions/product";
import CrossSellCard from "../cross-sell-card";
import { H3, StyledLink } from "@/components";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";

const CrossSellContainer = ({ creativeId }: { creativeId: string }) => {
  const { data: products } = useGetAllProducts();
  const { data: creative } = useGetCreativeById(creativeId);

  return (
    <section className="flex flex-col gap-8 py-5 lg:py-10 mb-10">
      <H3>Explore other creatives by {creative?.brandName} </H3>

      <div className="flex flex-col gap-8 lg:gap-[60px] ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products &&
            products?.map((product) => {
              return <CrossSellCard key={product._id} product={product} />;
            })}
        </div>

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
