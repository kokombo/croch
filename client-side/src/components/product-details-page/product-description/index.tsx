const ProductDescription = ({ description }: { description: string }) => {
  return (
    <article className="flex flex-col gap-8">
      <h3 className="text-xl font-bold">Product Description</h3>

      <p className="text-base font-normal">{description}</p>
    </article>
  );
};

export default ProductDescription;
