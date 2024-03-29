"use client";
import { ProtectRoute } from "@/components";
import "../../../globals.css";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/utilities";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const { id } = useCurrentUser();

  const { data: creative } = useGetCreativeById(id);

  useEffect(() => {
    if (creative?.accountSetupDone) {
      router.push("/creative/dashboard");
    }
  }, [creative?.accountSetupDone, router]);

  return <ProtectRoute>{children}</ProtectRoute>;
}
