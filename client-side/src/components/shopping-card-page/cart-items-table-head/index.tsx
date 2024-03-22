import { H6 } from "@/components";

const CartItemsTableHead = () => {
  return (
    <div className="flex items-center my-4 gap-6 bg-gray px-8 h-16">
      <div className="w-1/3">
        <H6>PRODUCT</H6>
      </div>

      <div className="w-2/3 grid grid-cols-4 place-items-center">
        <H6>PRICE</H6>

        <H6>QUANTITY</H6>

        <H6>SIZE</H6>

        <H6>SUB-TOTAL</H6>
      </div>
    </div>
  );
};

export default CartItemsTableHead;
