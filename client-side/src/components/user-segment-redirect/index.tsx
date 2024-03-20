import { useCurrentUser } from "@/utilities";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserSegmentRedirect = ({ children }: { children: React.ReactNode }) => {
  const { role, status } = useCurrentUser();

  const router = useRouter();

  useEffect(() => {
    const checkSession = () => {
      if (status === "unauthenticated") {
        router.push("/");
      }

      if (status === "authenticated" && role === "creative")
        router.push("/creative/dashboard");
    };

    checkSession();
  }, [role, router, status]);

  return status === "loading" ? <div>Loading...</div> : children;
};

export default UserSegmentRedirect;
