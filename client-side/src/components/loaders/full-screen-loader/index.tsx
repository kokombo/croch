import { Logo, NavAccount, ThreeDotsLoader } from "@/components";

const FullScreenLoader = () => {
  return (
    <main className="h-screen">
      <nav className="nav_container">
        <Logo diabled={true} />

        <NavAccount onClick={() => {}} opened={false} />
      </nav>

      <div className="flex items-center justify-center h-[80vh]">
        <ThreeDotsLoader />
      </div>
    </main>
  );
};

export default FullScreenLoader;
