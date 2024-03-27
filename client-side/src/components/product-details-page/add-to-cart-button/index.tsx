import { CustomButton } from "@/components";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "@/utilities";
import { DispatchType } from "@/redux/store";
import { useAddToCart } from "@/utilities/api-interactions/cart";
import { useRemoveFromCart } from "@/utilities/api-interactions/cart";
import { useGetCartItems } from "@/utilities/api-interactions/cart";
import { setOpenLoginModal } from "@/redux/slices/modal";

type Props = {
  product: Product;
  count: number;
  size: string;
};

const AddToCartButton = (props: Props) => {
  const { session } = useCurrentUser();

  const dispatch: DispatchType = useDispatch();

  const { addToCart } = useAddToCart(
    props.product._id,
    props.size,
    props.count
  );

  const { removeFromCart } = useRemoveFromCart(props.product._id);

  const { data: items } = useGetCartItems(props.product.owner._id);

  const idsOfProductsInCart = items?.cartItems?.map((cartItem) =>
    cartItem.info._id.toString()
  );

  const addProductToCart = () => {
    if (!session) {
      dispatch(setOpenLoginModal(true));
      document.body.style.overflow = "hidden";
    } else {
      addToCart();
    }
  };
  return (
    <span>
      {!session || !idsOfProductsInCart?.includes(props.product._id) ? (
        <CustomButton
          type="button"
          label="Add to cart"
          onClick={addProductToCart}
          extraClasses="bg-green text-white w-full py-4 px-5"
        />
      ) : (
        <CustomButton
          type="button"
          label="Remove"
          onClick={removeFromCart}
          extraClasses="bg-black text-white w-full py-4 px-5"
        />
      )}
    </span>
  );
};

export default AddToCartButton;
