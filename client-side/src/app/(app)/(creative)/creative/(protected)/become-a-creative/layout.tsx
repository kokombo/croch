"use client";

import "../../../../../globals.css";
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

  const { id, isCreative } = useCurrentUser();

  const { data: creative } = useGetCreativeById(id, isCreative);

  useEffect(() => {
    if (creative?.accountSetupDone) {
      router.push(
        `/creative/dashboard/${creative?.brandName.toLowerCase()}~${creative?._id.substring(0, 16)}`
      );
    }
  }, [creative, router]);

  return children;
}
