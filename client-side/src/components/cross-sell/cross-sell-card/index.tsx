import { H4, H6, AddToCartButton } from "@/components";
import Image from "next/image";
import commaNumber from "comma-number";
import { icons } from "@/constants";
import Link from "next/link";

type Props = {
  product: Product;
};

const CrossSellCard = (props: Props) => {
  const productUrl = decodeURIComponent(
    `/crafts?title=${props.product.title}&craftId=${props.product._id}`
  ).replaceAll(" ", "-");

  return (
    <Link href={productUrl} target="_blank">
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
            className="rounded-lg object-cover"
          />
        </div>

        <span className="flex items-start justify-between gap-1 h-[30px]">
          <H6>{props.product.title} </H6>

          {props.product.rating && (
            <span className="flex">
              {props.product.rating}{" "}
              <Image
                src={icons.star}
                alt=""
                width={20}
                height={20}
                className="object-contain"
              />{" "}
            </span>
          )}
        </span>

        <span className="flex_center justify-between">
          <H4>&#8358;{commaNumber(props.product?.price)}</H4>

          <AddToCartButton product={props.product} size="" count={1} />
        </span>
      </article>
    </Link>
  );
};

export default CrossSellCard;
