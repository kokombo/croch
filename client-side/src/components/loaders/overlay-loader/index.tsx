import RingsLoader from "../rings";

const OverlayLoader = () => {
  return (
    <div className="fixed w-full h-screen top-0 left-0 grid place-items-center z-[9999] bg-modelblack ">
      <RingsLoader />
    </div>
  );
};

export default OverlayLoader;
