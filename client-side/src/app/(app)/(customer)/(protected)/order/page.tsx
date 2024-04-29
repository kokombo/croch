"use client";

import { H2, H6, OrderFilter, OrderTable } from "@/components";
import { useGetCustomerOrders } from "@/utilities/api-interactions/order";
import { useState } from "react";

const Order = () => {
  const [status, setStatus] = useState("pending");

  const {
    data: orders,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetCustomerOrders(status);

  return (
    <main className="paddingX py-10">
      <div className="flex_item_justify_between py-4  border-x-[1px] border-t-[1px] border-grey px-12">
        <span>
          <H2>Orders</H2>
          <H6>{orders?.length} orders found</H6>
        </span>

        <span></span>
      </div>

      <OrderFilter />

      <OrderTable
        orders={orders}
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error}
      />
    </main>
  );
};

export default Order;
