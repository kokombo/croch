"use client";

import { useGetCustomerOrders } from "@/utilities/api-interactions/order";

const Order = () => {
  const { data, isError, isLoading, isSuccess, error } =
    useGetCustomerOrders("pending");

  return <div>Order</div>;
};

export default Order;
