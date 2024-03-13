import { useCurrentUser } from "@/utilities";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const RoutesProtector = ({ children }: { children: React.ReactNode }) => {
  const { role } = useCurrentUser();

  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/");
    },
  });

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  return <>{children}</>;
};

export default RoutesProtector;
