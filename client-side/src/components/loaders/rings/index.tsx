import { Rings } from "react-loader-spinner";

const RingsLoader = () => {
  return (
    <Rings
      visible={true}
      height="80"
      width="80"
      color="#2DB224"
      ariaLabel="rings-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default RingsLoader;
