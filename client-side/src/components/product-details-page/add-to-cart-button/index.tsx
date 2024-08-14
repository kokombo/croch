import { CustomButton } from "@/components/buttons";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "@/utilities";
import type { DispatchType } from "@/redux/store";
import { useAddToCart } from "@/utilities/api-interactions/cart";
import { useRemoveFromCart } from "@/utilities/api-interactions/cart";
import { useGetCartItems } from "@/utilities/api-interactions/cart";
import { setOpenLoginModal } from "@/redux/slices/modal";
import type { MouseEvent } from "react";

type Props = {
  product: Product;
  count: number;
  size: string;
};

const AddToCartButton = (props: Props) => {
  const { session } = useCurrentUser();

  const dispatch: DispatchType = useDispatch();

  const { addToCart, isPending: addingToCart } = useAddToCart(
    props.product._id,
    props.size,
    props.count
  );

  const { removeFromCart, isPending: removingFromCart } = useRemoveFromCart(
    props.product._id
  );

  const { data: items } = useGetCartItems(props.product.owner._id);

  const idsOfProductsInCart = items?.cartItems?.map((cartItem) =>
    cartItem.info._id.toString()
  );

  const addProductToCart = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!session) {
      dispatch(setOpenLoginModal(true));
    } else {
      addToCart();
    }
  };

  const removeProductFromCart = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    removeFromCart();
  };

  return (
    <span>
      {!session || !idsOfProductsInCart?.includes(props.product._id) ? (
        <CustomButton
          type="button"
          label={addingToCart ? "Adding to cart..." : "Add to cart"}
          onClick={addProductToCart}
          className="bg-green text-white font-medium w-full py-3 px-4 lg:py-4"
        />
      ) : (
        <CustomButton
          type="button"
          label={removingFromCart ? "Removing..." : "Remove"}
          onClick={removeProductFromCart}
          className="bg-black text-white font-medium w-full py-3 px-4 lg:py-4"
        />
      )}
    </span>
  );
};

export default AddToCartButton;
