"use client";

import { useGetCarts } from "@/utilities/api-interactions/cart";

const Cart = () => {
  const { data: carts } = useGetCarts();

  return <div>Cart</div>;
};

export default Cart;
