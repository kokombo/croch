"use client";

import { H2, H6, H5 } from "@/components";
import {
  OrderCustomerSummary,
  OrderDetailsTable,
} from "@/components/order-details";
import { useGetCreativeById } from "@/utilities/api-interactions/creative";
import { useGetOrder } from "@/utilities/api-interactions/order";
import { useParams, useRouter } from "next/navigation";

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
    <main className="paddingX py-20">
      <button
        onClick={() => {
          router.push("/order");
        }}
      >
        Orders
      </button>

      <div className="flex gap-4">
        <div className="w-70">
          <div className="flex_item_justify_between p-4  border-x-[1px] border-t-[1px] border-grey">
            {order && (
              <span className="flex_col_start gap-2">
                <H2>Order #CR{order._id.substring(18, 24).toUpperCase()}</H2>

                <H5>{new Date(order.createdAt as string).toDateString()} </H5>

                <H5>
                  {new Date(order.createdAt as string).toLocaleTimeString()}
                </H5>

                <H6
                  extraClasses={`${order.status === "pending" ? "text-orange" : "fulfilled" ? "text-lightgreen" : "text-red"} capitalize`}
                >
                  {order.status}
                </H6>
              </span>
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
