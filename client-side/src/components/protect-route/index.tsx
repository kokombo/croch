import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });

  return status === "loading" ? <div>Loading...</div> : children;
};

export default ProtectRoute;
