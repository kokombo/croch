import Image from "next/image";

type Props = {
  cartItems: CartItem[];
};

const OrderSummaryProductList = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {props.cartItems.map((item) => {
        return (
          <div key={item.info._id} className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-xl">
              <Image
                src={item.thumbNail}
                alt=""
                fill
                quality={100}
                loading="lazy"
                sizes="any"
                className="rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-[6px] text-sm text-customblack">
              <span>{item.title.substring(0, 25)} </span>

              <span>
                {item.count} x{" "}
                <span className="text-skyblue">
                  {" "}
                  &#8358;{item.info.price.toLocaleString()}
                </span>{" "}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderSummaryProductList;
