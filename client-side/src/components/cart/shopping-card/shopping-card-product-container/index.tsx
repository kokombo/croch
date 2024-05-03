import { ThreeDotsLoader, H3, StyledLink } from "@/components";
import CartItemsTableHead from "../cart-items-table-head";
import ShoppingCardListItem from "../shopping-card-list-item";
import { icons } from "@/constants";

type Props = {
  isLoading: boolean;
  cart: Cart | undefined;
  isSuccess: boolean;
};

const ShoppingCardProductContainer = (props: Props) => {
  return (
    <div className="flex flex-col gap-1 py-8 border_grey_1 rounded-xl h-fit bg-white">
      <span className="mx-3 lg:mx-6 block">
        <H3>Shopping Card</H3>
      </span>

      <>
        {props.isLoading ? (
          <div className="flex_item_justify_center h-200">
            <ThreeDotsLoader />
          </div>
        ) : (
          <div>
            <CartItemsTableHead />

            <div className="flex flex-col gap-8 py-4 px-3 lg:p-6">
              {props.cart?.cartItems?.map((cartItem) => {
                return (
                  <ShoppingCardListItem
                    key={cartItem.info._id}
                    cartItem={cartItem}
                  />
                );
              })}
            </div>
          </div>
        )}
      </>

      {props.isSuccess && (
        <StyledLink
          href="/cart"
          label="Return to cart"
          leftIcon={icons.arrowleft}
          extraClasses="border_grey_1 w-fit ml-3 lg:ml-8 mt-12 hover:bg-gray"
        />
      )}
    </div>
  );
};

export default ShoppingCardProductContainer;
