"use client";

import { OrderStatusSuccess } from "@/components/order";
import { useSearchParams } from "next/navigation";

const BillingStatus = () => {
  const params = useSearchParams();

  const status = params.getAll("")[0];

  return (
    <main className=" grid place-items-center">
      {status === "success" ? (
        <OrderStatusSuccess />
      ) : "failed" ? (
        <div>Failed</div>
      ) : (
        ""
      )}
    </main>
  );
};

export default BillingStatus;
