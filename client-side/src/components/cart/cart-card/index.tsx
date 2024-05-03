import { useState } from "react";
import Image from "next/image";
import { H5, H6, PromptCard } from "../..";
import { CustomButton } from "@/components/buttons";
import { icons } from "@/constants";
import { useDeleteCart } from "@/utilities/api-interactions/cart";
import { useRouter } from "next/navigation";
import { Tooltip } from "react-tooltip";

type Props = {
  cart: {
    brandName: string;
    brandLogo: string;
    creativeId: string;
  };
};

const CartCard = (props: Props) => {
  const [openDeleteBoard, setOpenDeleteBoard] = useState(false);

  const router = useRouter();

  const { deleteCart, data, isPending, error } = useDeleteCart(
    props.cart.creativeId
  );

  return (
    <div className="cart_card">
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="relative h-10 w-10 lg:h-[72px] lg:w-[72px] rounded-full bg-grey">
          <Image
            src={props.cart.brandLogo}
            alt=""
            className="rounded-full object-cover object-center"
            quality={100}
            fill
            sizes="any"
          />
        </div>

        <article className="flex flex-col gap-2">
          <H5>{props.cart.brandName}</H5>
          <H6>Creator handmade</H6>
        </article>
      </div>

      <div className="flex items-center gap-2 lg:gap-6">
        <CustomButton
          type="button"
          label="View"
          extraClasses="border-[1px] border-grey p-3 text-grey3 text-sm hover:bg-gray"
          onClick={() =>
            router.push(`/cart/shopping_card?id=${props.cart.creativeId}`)
          }
        />

        <div className="relative">
          <>
            <a id="delete-cart-anchor-element">
              <button type="button" onClick={() => setOpenDeleteBoard(true)}>
                <Image src={icons.deleteicon} alt="" height={22} width={22} />
              </button>
            </a>

            <Tooltip
              anchorSelect="#delete-cart-anchor-element"
              content="Delete cart"
            />
          </>

          {openDeleteBoard && (
            <PromptCard
              prompt="Confirm delete this cart?"
              closeCard={() => setOpenDeleteBoard(false)}
              confirm={() => {
                deleteCart();
                setOpenDeleteBoard(false);
              }}
              extraClasses="right-0 lg:left-0 top-0"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
