import { H3 } from "@/components";

const ProductDescription = ({ description }: { description: string }) => {
  return (
    <article className="flex flex-col gap-8">
      <H3>Product Description</H3>

      <p className="text-sm leading-6 lg:text-base lg:leading-7">{description}</p>
    </article>
  );
};

export default ProductDescription;
