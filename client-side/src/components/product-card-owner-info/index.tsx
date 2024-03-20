import Image from "next/image";

type Props = {
  product: Product;
  extraClasses?: string;
};

const ProductCardOwnerInfo = (props: Props) => {
  return (
    <div
      className={`${props.extraClasses} w-[90%] h-12 bg-white rounded flex items-center justify-start gap-2 px-4 py-3`}
    >
      <Image
        src={props.product.owner.picture || "/cp.png"}
        alt={`product-${props.product.owner._id} owner image`}
        quality={100}
        height={40}
        width={40}
        className="rounded-[100%] w-10 h-10 object-cover"
        decoding="async"
      />

      <p>{props.product.owner.firstName}</p>
    </div>
  );
};

export default ProductCardOwnerInfo;
