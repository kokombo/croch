import { ThreeDots } from "react-loader-spinner";

const ThreeDotsLoader = () => {
  return (
    <ThreeDots
      visible={true}
      height="50"
      width="50"
      color="#2DB224"
      radius="6"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default ThreeDotsLoader;
