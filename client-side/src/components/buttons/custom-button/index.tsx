import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { MouseEvent } from "react";

type Props = {
  label: string;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  extraClasses?: string;
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
      className={`${props.extraClasses} rounded-lg text-base font-semibold `}
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
