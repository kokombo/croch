import { twMerge } from "tailwind-merge";

type Props = {
  message: string | undefined;
  className?: string;
};

const CustomError = (props: Props) => {
  return (
    <div className={twMerge("text-red font-medium text-sm", props.className)}>
      {props.message}
    </div>
  );
};

export default CustomError;
