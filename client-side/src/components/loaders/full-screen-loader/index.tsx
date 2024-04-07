import { Footer, Logo, NavAccount, ThreeDotsLoader } from "@/components";

const FullScreenLoader = () => {
  return (
    <main className="h-screen w-full">
      <nav className="nav_container">
        <Logo diabled={true} />

        <NavAccount onClick={() => {}} opened={false} />
      </nav>

      <div className="grid place-items-center h-[86vh]">
        <span className="border_grey_1 rounded-2xl w-[95%] lg:w-[85%] h-[90%] flex_item_justify_center">
          <ThreeDotsLoader />
        </span>
      </div>
      <Footer />
    </main>
  );
};

export default FullScreenLoader;
