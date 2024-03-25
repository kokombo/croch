import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FullScreenLoader } from "..";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });

  return status === "loading" ? <FullScreenLoader /> : children;
};

export default ProtectRoute;
