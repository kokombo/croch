import { icons } from "@/constants";
import Image from "next/image";

type Props = {
  extraClasses?: string;
};

const AddToWishlist = (props: Props) => {
  return (
    <button
      type="button"
      className={`${props.extraClasses} hover:scale-110 transition-transform duration-300 ease-in-out`}
    >
      <Image
        src={icons.bookmark}
        alt="add to wishlist icon"
        height={24}
        width={24}
      />
    </button>
  );
};

export default AddToWishlist;
