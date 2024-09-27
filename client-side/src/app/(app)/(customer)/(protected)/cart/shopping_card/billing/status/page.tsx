"use client";
import { OrderStatusSuccess } from "@/components/order";
import { useSearchParams } from "next/navigation";

const BillingStatus = () => {
  const params = useSearchParams();
  const status = params.getAll("")[0];

  return (
    <div className=" grid place-items-center">
      {status === "success" ? (
        <OrderStatusSuccess />
      ) : status === "failed" ? (
        <div>Failed</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BillingStatus;
