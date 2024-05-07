"use client";

import { H2, H6 } from "@/components";
import { OrderDetailsTable } from "@/components/order-details";
import { useGetOrder } from "@/utilities/api-interactions/order";
import { useParams } from "next/navigation";

const OrderDetails = () => {
  const params = useParams();

  const {
    data: order,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetOrder(params._id as string);

  return (
    <main className="paddingX py-10">
      <div className="flex">
        <div className="w-70">
          <div className="flex_item_justify_between p-4  border-x-[1px] border-t-[1px] border-grey">
            <span className="flex_col_start gap-2">
              <H2>Order #CR{order?._id.substring(18, 24).toUpperCase()}</H2>
              <p>{new Date(order?.createdAt as string).toDateString()} </p>
              <p>
                {new Date(order?.createdAt as string).toLocaleTimeString()}{" "}
              </p>
            </span>

            <span></span>
          </div>

          <OrderDetailsTable
            order={order}
            error={error}
            isError={isError}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </div>

        <div className="w-30"></div>
      </div>

      <div></div>
    </main>
  );
};

export default OrderDetails;
