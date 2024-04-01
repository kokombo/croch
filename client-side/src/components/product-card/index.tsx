import { useState } from "react";
import { H4, H6, Slider, UnclickableRating } from "..";
import Link from "next/link";
import commaNumber from "comma-number";
import useScreenSize from "@/utilities/hooks/useScreenSize";

type Props = {
  product: Product;
};

const ProductCard = (props: Props) => {
  const [showButton, setShowButton] = useState(false);

  const productUrl = decodeURIComponent(
    `/crafts?title=${props.product.title}&craftId=${props.product._id}`
  ).replaceAll(" ", "-");

  const { screenSize } = useScreenSize();

  const handleMouseEnter = () => {
    if (screenSize && screenSize > 768) {
      setShowButton(true);
    }
  };

  return (
    <Link href={productUrl} target="_blank">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowButton(false)}
        className="w-full flex flex-col gap-3"
      >
        <Slider showButton={showButton} product={props.product} />

        <div className="flex flex-col gap-2">
          <>
            {props.product.rating ? (
              <UnclickableRating rating={props.product.rating} />
            ) : (
              <H6 extraClasses="underline"> No rating yet</H6>
            )}
          </>

          <span className="h-9">
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
