import Image from "next/image";
import { useDispatch } from "react-redux";
import { setOpenLoginModal } from "@/redux/slices/modal";
import { DispatchType } from "@/redux/store";
import { useCurrentUser } from "@/utilities";
import {
  useAddAndRemoveWishlist,
  useGetWishlists,
} from "@/utilities/api-interactions/customer";
import { MouseEvent } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  extraClasses?: string;
  productId: string;
  icon: string | StaticImport;
};

const AddToWishlist = (props: Props) => {
  const dispatch: DispatchType = useDispatch();

  const { session } = useCurrentUser();

  const { addAndRemoveWishlist } = useAddAndRemoveWishlist(props.productId);

  const { data: wishlists } = useGetWishlists();

  const addToWishlist = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!session) {
      dispatch(setOpenLoginModal(true));
      document.body.style.overflow = "hidden";
    } else {
      addAndRemoveWishlist();
    }
  };

  return (
    <button
      type="button"
      onClick={addToWishlist}
      className={`${props.extraClasses} hover:scale-110 transition-transform duration-300 ease-in-out`}
    >
      <Image
        src={props.icon}
        alt="add to wishlist icon"
        height={24}
        width={24}
      />
    </button>
  );
};

export default AddToWishlist;
