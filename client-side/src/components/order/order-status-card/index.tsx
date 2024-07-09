import { twMerge } from "tailwind-merge";

type Props = {
  status: string | null;
};

const OrderStatusCard = (props: Props) => {
  return (
    <span
      className={twMerge(
        props.status === "pending"
          ? "border-orange text-orange"
          : props.status === "fulfilled"
            ? "border-lightgreen text-lightgreen"
            : "border-red text-red",
        "border-[1px] h-8 w-fit px-2 rounded-md flex_center font-medium text-xs sm:text-sm capitalize"
      )}
    >
      {props.status}
    </span>
  );
};

export default OrderStatusCard;
