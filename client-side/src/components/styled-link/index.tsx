import Link from "next/link";
import Image from "next/image";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { MouseEvent } from "react";

type Props = {
  label: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  extraClasses?: string;
  disabled?: boolean;
  href: string;
  leftIcon?: string | StaticImport;
  rightIcon?: string | StaticImport;
};

const StyledLink = (props: Props) => {
  return (
    <Link
      href={props.href}
      onClick={props.onClick}
      aria-disabled={props.disabled}
      className={`${props.extraClasses} px-5 py-4 lg:px-6 rounded-lg text-base font-medium`}
    >
      <span className="flex_item_justify_center gap-2">
        {props.leftIcon && (
          <Image
            src={props.leftIcon}
            alt="styled-link-left-icon"
            height={20}
            width={20}
          />
        )}

        {props.label}

        {props.rightIcon && (
          <Image
            src={props.rightIcon}
            alt="styled-link-right-icon"
            height={20}
            width={20}
          />
        )}
      </span>
    </Link>
  );
};

export default StyledLink;
