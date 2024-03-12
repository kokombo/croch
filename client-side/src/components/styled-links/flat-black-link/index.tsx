import Link from "next/link";
import { MouseEvent } from "react";

type Props = {
  label: string;
  extraClasses?: string;
  onClick?: (e: any) => void;
  href: string;
};

const FlatBlackLink = (props: Props) => {
  return (
    <Link
      href={props.href}
      onClick={props.onClick}
      className={`rounded-lg text-base font-bold inline-block text-center ${props.extraClasses}`}
    >
      {props.label}
    </Link>
  );
};

export default FlatBlackLink;
