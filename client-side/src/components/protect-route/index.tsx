import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThreeDotsLoader } from "..";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });

  return status === "loading" ? (
    <main className="h-screen grid place-items-center">
      <ThreeDotsLoader />
    </main>
  ) : (
    children
  );
};

export default ProtectRoute;
