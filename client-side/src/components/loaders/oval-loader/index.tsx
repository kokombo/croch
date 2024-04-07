import { Oval } from "react-loader-spinner";

type Props = {
  height: string;
  width: string;
  color: string;
};

const OvalLoader = (props: Props) => {
  return (
    <Oval
      visible={true}
      height={props.height}
      width={props.width}
      color={props.color}
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default OvalLoader;
