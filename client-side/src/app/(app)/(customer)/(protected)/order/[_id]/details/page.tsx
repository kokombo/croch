"use client";

import { H2, H6, H5 } from "@/components";
import { OrderStatusCard } from "@/components/order";
import {
  OrderCustomerSummary,
  OrderDetailsTable,
} from "@/components/order-details";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import { useGetOrder } from "@/utilities/api-interactions/order";
import { useParams, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

const OrderDetails = () => {
  const params = useParams();
  const router = useRouter();

  const {
    data: order,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetOrder(params._id as string);

  const { data: creative } = useGetCreativeById(order?.creativeId, true);

  return (
    <main className="paddingX py-10">
      <button
        onClick={() => {
          router.push("/order");
        }}
        className="underline text-lightgreen"
      >
        Back
      </button>

      <div className="flex gap-4 mt-4">
        <div className="w-70">
          <div className="flex_item_justify_between p-4  border-x-[1px] border-t-[1px] border-grey">
            {order && (
              <article className="flex justify-between w-full">
                <span className="flex_col_start gap-2">
                  <H2>Order #CR{order._id.substring(18, 24).toUpperCase()}</H2>

                  <H5>{new Date(order.createdAt as string).toDateString()} </H5>

                  <H5>
                    {new Date(order.createdAt as string).toLocaleTimeString()}
                  </H5>
                </span>

                <OrderStatusCard status={order.status} />
              </article>
            )}

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

        <div className="w-30">
          <OrderCustomerSummary creative={creative} order={order} />
        </div>
      </div>

      <div></div>
    </main>
  );
};

export default OrderDetails;
