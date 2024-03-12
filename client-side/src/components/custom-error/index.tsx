type Props = {
  message: string | undefined;
  extraClasses?: string;
};

const CustomError = (props: Props) => {
  return (
    <div className={`text-red-800 ${props.extraClasses}`}>{props.message}</div>
  );
};

export default CustomError;
