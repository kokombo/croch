"use client";

import { H2, H6, OrderFilter, OrderTable } from "@/components";
import { useGetCustomerOrders } from "@/utilities/api-interactions/order";
import { useEffect, useState } from "react";
import { SingleValue } from "react-select";

const Order = () => {
  const [status, setStatus] = useState<SingleValue<SelectOption>>({
    label: "All Orders",
    value: "all",
  });

  const {
    data: orders,
    isError,
    isLoading,
    isSuccess,
    error,
    refetch,
    isRefetching,
  } = useGetCustomerOrders(status?.value!);

  useEffect(() => {
    refetch();
  }, [status]);

  return (
    <main className="paddingX py-10">
      <div className="flex_item_justify_between py-4  border-x-[1px] border-t-[1px] border-grey px-12">
        <span>
          <H2>Orders</H2>
          <H6>{orders?.length} orders found</H6>
        </span>

        <span></span>
      </div>

      <OrderFilter status={status} setStatus={setStatus} />

      <OrderTable
        orders={orders}
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error}
        status={status}
      />
    </main>
  );
};

export default Order;
