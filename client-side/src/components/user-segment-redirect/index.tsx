import { useCurrentUser } from "@/utilities";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ColorRingLoader, FullScreenLoader, OverlayLoader } from "..";

const UserSegmentRedirect = ({ children }: { children: React.ReactNode }) => {
  const [redirecting, setRedirecting] = useState(false);
  const { status, id, isCreative } = useCurrentUser();
  const { data: creative } = useGetCreativeById(id, isCreative);
  const router = useRouter();

  useEffect(() => {
    const checkCurrentUser = () => {
      if (status === "authenticated") {
        if (creative) {
          setRedirecting(true);

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

  return status === "loading" ? (
    <FullScreenLoader />
  ) : redirecting ? (
    <OverlayLoader>
      <ColorRingLoader />
    </OverlayLoader>
  ) : (
    children
  );
};

export default UserSegmentRedirect;
