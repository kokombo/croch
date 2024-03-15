const ProductDescription = ({ description }: { description: string }) => {
  return (
    <article className="flex flex-col gap-8">
      <h3 className="text-xl font-bold">Product Description</h3>

      <p className="text-base font-normal">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, Lorem ipsum dolor sit amet, consectetuer
        adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, Show more
      </p>
    </article>
  );
};

export default ProductDescription;
