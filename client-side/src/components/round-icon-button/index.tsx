import React from "react";

type Props = {
  hidden?: boolean;
  onClick?: () => void;
  label: string | React.JSX.Element;
  extraClasses?: string;
};

const RoundIconButton = (props: Props) => {
  return (
    <button
      hidden={props.hidden}
      type="button"
      className={`${props.extraClasses} rounded-full h-10 w-10 text-[10px] hover:scale-105 transition-transform duration-300 ease-in-out`}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default RoundIconButton;
