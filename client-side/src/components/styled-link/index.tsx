import Link from "next/link";

type Props = {
  label: string;
  onClick?: () => void;
  extraClasses?: string;
  disabled?: boolean;
  href: string;
};

const StyledLink = (props: Props) => {
  return (
    <Link
      href={props.href}
      onClick={props.onClick}
      aria-disabled={props.disabled}
      className={`${props.extraClasses} rounded-lg text-base font-semibold flex items-center justify-center `}
    >
      {props.label}
    </Link>
  );
};

export default StyledLink;
