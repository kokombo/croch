"use client";

import { useSearchParams } from "next/navigation";

const BillingStatus = () => {
  const params = useSearchParams();

  const status = params.getAll("")[0];

  return (
    <main>
      {status === "success" ? (
        <div>Success</div>
      ) : "failed" ? (
        <div>Failed</div>
      ) : (
        ""
      )}
    </main>
  );
};

export default BillingStatus;
