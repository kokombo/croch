import { H4, H6, CustomButton, AddToCartButton } from "@/components";
import Image from "next/image";
import commaNumber from "comma-number";

type Props = {
  product: Product;
};

const CrossSellCard = (props: Props) => {
  return (
    <article className="p-4 border_grey_1 rounded-2xl flex flex-col gap-6">
      <div className="relative w-full h-[260px] rounded-lg bg-grey">
        <Image
          src={props.product.photos[0]}
          alt={props.product.title.substring(0, 10)}
          fill
          quality={100}
          loading="lazy"
          sizes="any"
          decoding="async"
          className="rounded-lg"
        />
      </div>

      <span className="flex_center justify-between ">
        <H6>{props.product.title} </H6>

        <p>{props.product.rating} </p>
      </span>

      <span className="flex_center justify-between">
        <H4>&#8358;{commaNumber(props.product?.price)}</H4>

        <AddToCartButton product={props.product} size="" count={1} />
      </span>
    </article>
  );
};

export default CrossSellCard;
