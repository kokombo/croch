import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const useAddToCart = (productId: string) => {
  const { accessToken } = useCurrentUser();

  const addToCartRequest = async (
    productId: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.put(
      `${api_base_url}/customer/addToCart`,

      {
        productId,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation({
    mutationKey: ["addToCart", productId],
    mutationFn: addToCartRequest,
  });

  const addToCart = async () => {
    await mutateAsync(productId);
  };

  return { addToCart, data, isError, isPending, error };
};

export const useRemoveFromCart = (productId: string) => {
  const { accessToken } = useCurrentUser();

  const removeFromCartRequest = async (
    productId: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.put(
      `${api_base_url}/customer/removeFromCart`,

      {
        productId,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation({
    mutationKey: ["removeFromCart", productId],
    mutationFn: removeFromCartRequest,
  });

  const removeFromCart = async () => {
    await mutateAsync(productId);
  };

  return { removeFromCart, data, isError, isPending, error };
};

export const useUpdateCartItemCount = (
  productId: string,
  count: number,
  creativeId: string
) => {
  const { accessToken } = useCurrentUser();

  const updateCartItemCountRequest = async ({
    productId,
    count,
    creativeId,
  }: {
    productId: string;
    count: number;
    creativeId: string;
  }) => {
    const res = await axios.put(
      `${api_base_url}/customer/updateCartItemCount`,

      {
        productId,
        count,
        creativeId,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation({
    mutationKey: ["updateCartItemCount", productId],
    mutationFn: updateCartItemCountRequest,
  });

  const updateCartItemCount = async () => {
    await mutateAsync({ productId, count, creativeId });
  };

  return { updateCartItemCount, data, isError, isPending, error };
};

export const useAddAndRemoveWishlist = (productId: string) => {
  const { accessToken } = useCurrentUser();

  const addAndRemoveWishlistRequest = async (
    productId: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.put(
      `${api_base_url}/customer/addAndRemoveWishlist`,

      {
        productId,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation({
    mutationKey: ["addAndRemoveWishlist"],
    mutationFn: addAndRemoveWishlistRequest,
  });

  const addAndRemoveWishlist = async () => {
    await mutateAsync(productId);
  };

  return { addAndRemoveWishlist, data, isError, isPending, error };
};

export const useDeleteCart = (creativeId: string) => {
  const { accessToken } = useCurrentUser();

  const deleteCartRequest = async (
    creativeId: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.delete(
      `${api_base_url}/customer/deleteCart?cart=${creativeId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isPending, isError, error } = useMutation({
    mutationKey: ["deleteCart", creativeId],
    mutationFn: deleteCartRequest,
  });

  const deleteCart = async () => {
    await mutateAsync(creativeId);
  };

  return { deleteCart, data, isPending, isError, error };
};
