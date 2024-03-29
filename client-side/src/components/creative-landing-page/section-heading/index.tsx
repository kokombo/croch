type Props = {
  heading1: string;
  heading2: string;
  heading3: string;
};

const SectionHeading = (props: Props) => {
  return (
    <div className="flex_col_center text-center gap-3 max-w-[682px]">
      <h3 className="font-bold tracking-[16%] text-grey2">{props.heading1}</h3>

      <h2 className="text-5xl leading-[64px] font-bold">{props.heading2}</h2>

      <h4 className="text-xl leading-9 font-medium text-grey3">
        {props.heading3}
      </h4>
    </div>
  );
};

export default SectionHeading;
