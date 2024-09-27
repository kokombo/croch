"use client";

import { H2, H6 } from "@/components";
import { OrderFilter, OrderTable } from "@/components/order";
import { useGetCustomerOrders } from "@/utilities/api-interactions/order";
import { useEffect, useState } from "react";
import type { RangeKeyDict } from "react-date-range";
import type { SingleValue } from "react-select";

const Order = () => {
  const [status, setStatus] = useState<SingleValue<SelectOption>>({
    label: "All Orders",
    value: "all",
  });

  const handleDateSelect = (rangesByKey: RangeKeyDict) => {
    console.log(rangesByKey);
  };

  const {
    data: orders,
    isError,
    isLoading,
    isSuccess,
    error,
    refetch,
    isRefetching,
  } = useGetCustomerOrders(status?.value as string);

  // biome-ignore lint:
  useEffect(() => {
    refetch();
  }, [status, refetch]);

  return (
    <div className="paddingX py-10">
      <div className="flex_item_justify_between p-4  border-x-[1px] border-t-[1px] border-grey">
        <span>
          <H2>Orders</H2>
          <H6>{orders?.length} orders found</H6>
        </span>

        <span />
      </div>

      <OrderFilter
        status={status}
        setStatus={setStatus}
        startDate={new Date()}
        endDate={new Date()}
        handleSelect={handleDateSelect}
      />

      <OrderTable
        orders={orders}
        isError={isError}
        isLoading={isLoading || isRefetching}
        isSuccess={isSuccess}
        error={error}
        status={status}
      />
    </div>
  );
};

export default Order;
