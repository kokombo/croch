import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const RoutesProtector = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  return <>{children}</>;
};

export default RoutesProtector;
