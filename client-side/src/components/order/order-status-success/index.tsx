import Image from "next/image";
import { icons } from "@/constants";
import { H3, H6, StyledLink } from "@/components";

const OrderStatusSuccess = () => {
  return (
    <div className="flex_item_justify_center flex-col text-center gap-6">
      <Image src={icons.successgreen} alt="success" width={152} height={152} />

      <H3>Your order is successfully placed.</H3>

      <span className="max-w-[450px]">
        <H6>
          Pellentesque sed lectus nec tortor tristique accumsan quis dictum
          risus. Donec volutpat mollis nulla non facilisis.
        </H6>
      </span>

      <span className="flex_center gap-6">
        <StyledLink
          label="Go to marketplace"
          href="/"
          leftIcon={icons.arrowleft}
          extraClasses="border_black_1 text-black w-fit"
        />

        <StyledLink
          label="View order"
          href="/order"
          rightIcon={icons.arrowrightwhite}
          extraClasses="text-white bg-customblack w-fit"
        />
      </span>
    </div>
  );
};

export default OrderStatusSuccess;
