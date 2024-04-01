import { Logo, NavAccount, ThreeDotsLoader } from "@/components";

const FullScreenLoader = () => {
  return (
    <main className="h-screen w-full">
      <nav className="nav_container">
        <Logo diabled={true} />

        <NavAccount onClick={() => {}} opened={false} />
      </nav>

      <div className="grid place-items-center h-full">
        <span className="border-hidden md:border-solid border_grey_1 rounded-2xl w-[70%] h-[90%] flex_item_justify_center">
          <ThreeDotsLoader />
        </span>
      </div>
    </main>
  );
};

export default FullScreenLoader;
