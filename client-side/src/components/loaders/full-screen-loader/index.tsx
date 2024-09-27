import { Footer, Logo, ThreeDotsLoader } from "@/components";
import { NavAccountButton } from "@/components/buttons";

const FullScreenLoader = () => {
  return (
    <div className="h-screen w-full">
      <nav className="nav_container">
        <Logo diabled={true} />

        <NavAccountButton onClick={() => {}} opened={false} />
      </nav>

      <div className="grid place-items-center h-[86vh]">
        <span className="border_grey_1 rounded-2xl w-[95%] lg:w-[90%] md:[85%] h-[90%] flex_item_justify_center">
          <ThreeDotsLoader />
        </span>
      </div>
      <Footer />
    </div>
  );
};

export default FullScreenLoader;
