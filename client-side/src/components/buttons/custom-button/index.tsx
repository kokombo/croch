import Image from "next/image";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label: string | JSX.Element;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  className?: string;
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  leftIcon?: string | StaticImport;
  rightIcon?: string | StaticImport;
};

const CustomButton = (props: Props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={twMerge(
        props.className,
        "rounded-lg text-sm lg:text-base font-medium "
      )}
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
    </button>
  );
};

export default CustomButton;
