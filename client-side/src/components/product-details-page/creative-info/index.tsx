import { icons } from "@/constants";
import Image from "next/image";
import { IconAndTextWrapper } from "@/components";

type Props = {
  creative: Creative;
  product: Product;
};

const CreativeInfo = (props: Props) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-[100px] w-[100px] rounded-full bg-grey">
        <Image
          src={props.product.owner.picture}
          alt={`${props.creative.brandName} logo`}
          fill
          quality={100}
          className="object-cover rounded-full "
          sizes="any"
        />
      </div>

      <article className="flex flex-col gap-2">
        <h5 className="text-base font-semibold">
          {props.product.owner.firstName} {props.product.owner.lastName}
        </h5>

        <h6 className="text-[#424242] text-sm font-medium opacity-50">
          {props.creative.brandName}
        </h6>

        <span className="flex gap-2">
          <>
            {props.creative.identityVerified ? (
              <IconAndTextWrapper
                icon={icons.identityverified}
                text="Identity verified"
              />
            ) : (
              <IconAndTextWrapper
                icon={icons.identityverified}
                text="Identity not verified"
              />
            )}
          </>

          <>
            {props.creative.isAvailable ? (
              <IconAndTextWrapper
                icon={icons.creativeisavailable}
                text="Available for pre-oder"
              />
            ) : (
              <IconAndTextWrapper
                icon={icons.creativeisavailable}
                text="Currently not available for pre-oder"
              />
            )}
          </>
        </span>
      </article>
    </div>
  );
};

export default CreativeInfo;
