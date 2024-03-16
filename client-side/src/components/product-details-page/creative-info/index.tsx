import { icons } from "@/constants";
import Image from "next/image";
import { IconAndTextWrapper } from "@/components";
import { Tooltip } from "react-tooltip";

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
              <>
                <a id="identity-verified-anchor-element">
                  <IconAndTextWrapper
                    icon={icons.identityverified}
                    text="Identity verified"
                  />
                </a>

                <Tooltip
                  anchorSelect="#identity-verified-anchor-element"
                  content="The identity of this creative has been verified."
                />
              </>
            ) : (
              <>
                <a id="identity-not-verified-anchor-element">
                  <IconAndTextWrapper
                    icon={icons.identityverified}
                    text="Identity not verified"
                  />
                </a>

                <Tooltip
                  anchorSelect="#identity-not-verified-anchor-element"
                  content="The identity of this creative has not been verified."
                />
              </>
            )}
          </>

          <>
            {props.creative.isAvailable ? (
              <>
                <a id="custom-order-available-anchor-element">
                  <IconAndTextWrapper
                    icon={icons.creativeisavailable}
                    text="Pre-order available"
                  />
                </a>

                <Tooltip
                  anchorSelect="#custom-order-available-anchor-element"
                  content="This creative is currently available to take custom orders."
                />
              </>
            ) : (
              <>
                <a id="custom-order-unavailable-anchor-element">
                  <IconAndTextWrapper
                    icon={icons.creativeisavailable}
                    text="Pre-order unavailable"
                  />
                </a>

                <Tooltip
                  anchorSelect="#custom-order-available-anchor-element"
                  content="This creative is currently not available to take custom orders."
                />
              </>
            )}
          </>
        </span>
      </article>
    </div>
  );
};

export default CreativeInfo;
