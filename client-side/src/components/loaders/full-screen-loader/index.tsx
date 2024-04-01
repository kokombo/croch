import { Logo, NavAccount, ThreeDotsLoader } from "@/components";

const FullScreenLoader = () => {
  return (
    <main className="h-screen w-full">
      <nav className="nav_container">
        <Logo diabled={true} />

        <NavAccount onClick={() => {}} opened={false} />
      </nav>

      <div className="grid place-items-center h-full">
        <span className="lg:rounded-2xl lg:border_grey_1 lg:w-[70%] lg:h-[90%] lg:flex_item_justify_center">
          <ThreeDotsLoader />
        </span>
      </div>
    </main>
  );
};

export default FullScreenLoader;
