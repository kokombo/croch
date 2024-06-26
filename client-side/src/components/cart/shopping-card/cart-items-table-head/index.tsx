import { H6 } from "@/components";

const CartItemsTableHead = () => {
  return (
    <div className="flex items-center my-4 gap-3 bg-gray px-3 lg:px-6 h-16 border-y-[1px] border-grey">
      <div className="w-1/3">
        <H6>PRODUCTS</H6>
      </div>

      <div className="hidden w-2/3 lg:grid grid-cols-4 place-items-center">
        <H6>PRICE</H6>

        <H6>QUANTITY</H6>

        <H6>SIZE</H6>

        <H6>SUB-TOTAL</H6>
      </div>
    </div>
  );
};

export default CartItemsTableHead;
