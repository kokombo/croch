import { useCurrentUser } from "@/utilities";
import { redirect } from "next/navigation";

const UserSegmentRedirect = () => {
  const { role } = useCurrentUser();

  if (role === "customer") {
    return redirect("/");
  }

  if (role === "creative") {
    return redirect("/creative/dashboard");
  }
};

export default UserSegmentRedirect;
