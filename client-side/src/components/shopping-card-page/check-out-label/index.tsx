import { icons } from "@/constants";
import Image from "next/image";

const CheckOutLabel = () => {
  return (
    <div className="p-5 border_grey_1 rounded-md flex flex-col gap-3">
      <p className="text-sm">100% Guarantee Safe Checkout</p>

      <div className="relative w-full h-[18px]">
        <Image
          src={icons.paymentmethod}
          alt="payment-methods-icons"
          fill
          quality={100}
          sizes="any"
        />
      </div>
    </div>
  );
};

export default CheckOutLabel;
