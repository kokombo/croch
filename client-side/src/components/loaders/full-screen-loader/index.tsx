import { Footer, Logo, NavAccount, ThreeDotsLoader } from "@/components";

const FullScreenLoader = () => {
  return (
    <main className="h-screen w-full">
      <nav className="nav_container">
        <Logo diabled={true} />

        <NavAccount onClick={() => {}} opened={false} />
      </nav>

      <div className="grid place-items-center h-[86vh]">
        <span className="border-hidden md:border-solid border_grey_1 md:rounded-2xl md:w-[85%] md:h-[90%] flex_item_justify_center">
          <ThreeDotsLoader />
        </span>
      </div>

      <Footer />
    </main>
  );
};

export default FullScreenLoader;
