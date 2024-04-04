import { icons } from "@/constants";
import { H3, CheckOutLabel, StyledLink, PricingBox } from "../..";

type Props = {
  cart: Cart;
};

const CheckOutCard = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <H3>Card Totals</H3>

      <PricingBox cart={props.cart} />

      <StyledLink
        href={`/cart/shopping_card/billing?for=${props.cart.cartItems[0]?.info.owner}`}
        label="Proceed to check out"
        extraClasses="text-white bg-green p-4 w-full"
        rightIcon={icons.arrowrightwhite}
      />

      <CheckOutLabel />
    </div>
  );
};

export default CheckOutCard;
