import { H4, AddToCartButton, H5, ProductAvailability } from "@/components";
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
      <article className="relative p-3 border_grey_1 rounded-2xl flex flex-col gap-6 w-[280px] md:w-[300px]">
        <div className="relative w-full h-[240px] md:h-[260px] rounded-lg bg-grey">
          <Image
            src={props.product.photos[0]}
            alt={props.product.title.substring(0, 10)}
            fill
            quality={100}
            loading="lazy"
            sizes="any"
            className="rounded-lg object-cover"
          />
        </div>

        <span className="flex_start_justify_between gap-1 h-[30px]">
          <H5>{props.product.title} </H5>

          {props.product.rating && (
            <span className="flex">
              {props.product.rating}{" "}
              <Image
                src={icons.star}
                alt=""
                width={20}
                height={20}
                className="object-contain"
                priority
                sizes="100vw"
                quality={100}
              />{" "}
            </span>
          )}
        </span>

        <span className="flex_item_justify_between ">
          <H4>&#8358;{commaNumber(props.product?.price)}</H4>

          <AddToCartButton product={props.product} size="" count={1} />
        </span>

        <ProductAvailability
          product={props.product}
          extraClasses="absolute left-[6%] top-4"
        />
      </article>
    </Link>
  );
};

export default CrossSellCard;
