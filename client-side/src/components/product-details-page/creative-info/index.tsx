import { icons } from "@/constants";
import Image from "next/image";
import { H6, IconAndTextWrapper } from "@/components";
import { Tooltip } from "react-tooltip";

type Props = {
  creative: Creative;
};

const CreativeInfo = (props: Props) => {
  return (
    <div className="flex items-center gap-2 lg:gap-3">
      <div className="relative h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] rounded-full bg-grey">
        <Image
          src={props.creative?.brandLogo}
          alt={`${props.creative?.brandName} logo`}
          fill
          quality={100}
          className="object-cover rounded-full "
          sizes="any"
        />
      </div>

      <article className="flex flex-col gap-2">
        {/* <h5 className="text-base font-semibold">
          {props.product.owner.firstName} {props.product.owner.lastName}
        </h5> */}

        <span className="text-[#424242] opacity-50">
          <H6> {props.creative.brandName}</H6>
        </span>

        <span className="flex gap-1 lg:gap-2">
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
                  style={{ width: "200px" }}
                />
              </>
            ) : (
              <>
                <a id="identity-not-verified-anchor-element">
                  <IconAndTextWrapper
                    icon={icons.identityverified}
                    text="Not verified"
                  />
                </a>

                <Tooltip
                  anchorSelect="#identity-not-verified-anchor-element"
                  content="The identity of this creative has not been verified."
                  style={{ width: "200px" }}
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
                  content="This creative is currently available to take custom pre-orders."
                  style={{ width: "200px" }}
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
                  style={{ width: "200px" }}
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
