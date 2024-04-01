import Image from "next/image";
import { icons } from "@/constants";
import { H3, H6, StyledLink } from "..";
import { MouseEvent } from "react";

type Props = {
  heading: string;
  subheading: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  href: string;
  buttonLabel: string;
  buttonExtraClasses?: string;
};

const EmptyCart = (props: Props) => {
  return (
    <div className="flex_item_justify_center flex-col bg-white gap-10">
      <div className="h-[300px] w-[300px] rounded-full bg-grey flex_item_justify_center">
        <Image
          src={icons.emptycart}
          alt=""
          priority
          width={237}
          height={162}
          quality={100}
        />
      </div>

      <span className="flex_col_center gap-2">
        <H3>{props.heading}</H3>

        <H6>{props.subheading}</H6>
      </span>

      <StyledLink
        href={props.href}
        onClick={props.onClick}
        label={props.buttonLabel}
        extraClasses={props.buttonExtraClasses}
        rightIcon={icons.arrowrightwhite}
      />
    </div>
  );
};

export default EmptyCart;
