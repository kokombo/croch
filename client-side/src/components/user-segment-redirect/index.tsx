import { useCurrentUser } from "@/utilities";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FullScreenLoader } from "..";

const UserSegmentRedirect = ({ children }: { children: React.ReactNode }) => {
  const { status, id } = useCurrentUser();

  const { data: creative, isLoading } = useGetCreativeById(id);

  const router = useRouter();

  useEffect(() => {
    const checkCurrentUser = () => {
      if (status === "authenticated") {
        if (creative) {
          if (creative.accountSetupDone) {
            router.push(
              `/creative/dashboard/${creative?.brandName.toLowerCase()}~${creative?._id.substring(0, 16)}`
            );
          } else {
            router.push("/creative/become-a-creative");
          }
        }
      }
    };

    checkCurrentUser();
  }, [router, status, creative]);

  return status === "loading" ? <FullScreenLoader /> : children;
};

export default UserSegmentRedirect;
