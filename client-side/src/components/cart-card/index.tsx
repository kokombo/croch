import { useState } from "react";
import Image from "next/image";
import { CustomButton, PromptCard } from "..";
import { icons } from "@/constants";
import { useDeleteCart } from "@/utilities/api-interactions/cart";
import { useRouter } from "next/navigation";

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
    <div className=" flex items-center justify-between border-[1px] border-grey rounded-xl py-6 px-5">
      <div className="flex items-center gap-6">
        <div className="relative h-[72px] w-[72px] rounded-full bg-grey">
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
          <h5>{props.cart.brandName} </h5>

          <h6>Creator handmade</h6>
        </article>
      </div>

      <div className="flex items-center gap-6">
        <CustomButton
          type="button"
          label="Open cart"
          extraClasses="border-[1px] border-grey p-4 text-grey3 text-sm hover:bg-gray"
          onClick={() =>
            router.push(`/cart/shopping_card?id=${props.cart.creativeId}`)
          }
        />

        <div className="relative">
          <button type="button" onClick={() => setOpenDeleteBoard(true)}>
            <Image src={icons.deleteicon} alt="" height={21} width={19.5} />
          </button>

          {openDeleteBoard && (
            <PromptCard
              prompt="Confirm delete this cart?"
              closeCard={() => setOpenDeleteBoard(false)}
              confirm={() => {
                deleteCart();
                setOpenDeleteBoard(false);
              }}
              extraClasses="top-0"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
