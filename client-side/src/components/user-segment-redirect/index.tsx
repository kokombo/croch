import { useCurrentUser } from "@/utilities";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FullScreenLoader } from "..";

const UserSegmentRedirect = ({ children }: { children: React.ReactNode }) => {
  const { role, status, id } = useCurrentUser();

  const { data: creative } = useGetCreativeById(id);

  const router = useRouter();

  useEffect(() => {
    const checkCurrentUser = () => {
      if (status === "authenticated" && role === "creative")
        if (creative?.accountSetupDone) {
          router.push(
            `/creative/${creative?.brandName.toLowerCase()}~${creative?._id.substring(0, 16)}`
          );
        } else {
          router.push("/creative/become-a-creative");
        }
    };

    checkCurrentUser();
  }, [role, router, status, creative]);

  return status === "loading" ? <FullScreenLoader /> : children;
};

export default UserSegmentRedirect;
