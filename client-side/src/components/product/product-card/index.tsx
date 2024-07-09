import { useState, Fragment } from "react";
import { H4, H6, Slider } from "../..";
import UnclickableRating from "../unclickable-rating";
import Link from "next/link";
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
    <Link href={productUrl} target="_blank" rel="noreferrer">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowButton(false)}
        className="w-full flex flex-col gap-3"
      >
        <Slider showButton={showButton} product={props.product} />

        <div className="flex flex-col gap-2">
          <Fragment>
            {props.product.rating > 0 ? (
              <UnclickableRating rating={props.product.rating} />
            ) : (
              <H6 extraClasses="underline"> No rating yet</H6>
            )}
          </Fragment>

          <span className="h-9">
            <h1 className="text-sm font-medium text-neutral">
              {props.product?.title}
            </h1>
          </span>

          <H4>&#x24;{props.product?.price.toLocaleString()}</H4>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
