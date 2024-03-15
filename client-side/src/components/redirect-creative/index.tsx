import { useCurrentUser } from "@/utilities";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectCreative = ({ children }: { children: React.ReactNode }) => {
  const { session, role, id } = useCurrentUser();

  const router = useRouter();

  const { data: creative } = useGetCreativeById(id);

  //   useEffect(() => {
  //     if (session && role === "creative") {
  //       if (creative?.accountSetupDone) {
  //         router.push("/creative/dashboard");
  //       } else {
  //         router.push("/creative/become-a-creative");
  //       }
  //     }
  //   }, [session, role]);

  return <>{children}</>;
};

export default RedirectCreative;
