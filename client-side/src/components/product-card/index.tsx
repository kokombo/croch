import { useState } from "react";
import { H4, Slider, UnclickableRating } from "..";
import Link from "next/link";
import commaNumber from "comma-number";

type Props = {
  product: Product;
};

const ProductCard = (props: Props) => {
  const [hideButton, setHideButton] = useState(true);

  const productUrl = decodeURIComponent(
    `/crafts?title=${props.product.title}&craftId=${props.product._id.substring(0, 16)}`
  ).replaceAll(" ", "-");

  return (
    <Link href={productUrl} target="_blank">
      <div
        onMouseEnter={() => setHideButton(false)}
        onMouseLeave={() => setHideButton(true)}
        className="w-full flex flex-col gap-3 pointer-events-none md:pointer-events-auto"
      >
        <Slider hideButton={hideButton} product={props.product} />

        <div className="flex flex-col gap-2">
          <UnclickableRating rating={props.product.rating} />

          <span className="h-8">
            <h1 className="text-sm font-medium text-neutral">
              {props.product?.title}
            </h1>
          </span>

          <H4>&#8358;{commaNumber(props.product?.price)}</H4>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
