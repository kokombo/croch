import { Logo, NavAccount, ThreeDotsLoader } from "@/components";

const FullScreenLoader = () => {
  return (
    <main className="h-screen w-full">
      <nav className="nav_container">
        <Logo diabled={true} />

        <NavAccount onClick={() => {}} opened={false} />
      </nav>

      <div className="flex_item_justify_center h-[80vh]">
        <ThreeDotsLoader />
      </div>
    </main>
  );
};

export default FullScreenLoader;
