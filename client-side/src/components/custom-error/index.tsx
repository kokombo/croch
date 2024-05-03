type Props = {
  message: string | undefined;
  extraClasses?: string;
};

const CustomError = (props: Props) => {
  return (
    <div className={`text-red font-medium text-sm ${props.extraClasses}`}>
      {props.message}
    </div>
  );
};

export default CustomError;
