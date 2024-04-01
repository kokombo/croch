import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import Image from "next/image";
import { H6 } from "..";

type Props = {
  product: Product;
  extraClasses?: string;
};

const ProductCardOwnerInfo = (props: Props) => {
  const { data: creative } = useGetCreativeById(props.product.owner._id);

  return (
    <div
      className={`${props.extraClasses} w-[90%] h-12 bg-white rounded flex_center justify-start gap-2 px-4 py-3`}
    >
      <div className="relative h-10 w-10 rounded-full bg-grey">
        {creative?.brandLogo && (
          <Image
            src={creative.brandLogo!}
            alt={`${creative.brandName.substring(0, 1)}`}
            quality={100}
            fill
            className="rounded-full object-cover"
            loading="eager"
            blurDataURL=""
            sizes="any"
          />
        )}
      </div>

      <H6> {props.product.owner.firstName} </H6>
    </div>
  );
};

export default ProductCardOwnerInfo;
