import axios, { type AxiosError } from "axios";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const useGetCartItems = (creativeId: string) => {
  const { accessToken } = useCurrentUser();

  const getCartItemsRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/cart/getCartItems?creativeId=${creativeId}`,

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  };

  const { data, isError, error, isLoading, isSuccess } = useQuery<
    Cart,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getCartItems"],
    queryFn: getCartItemsRequest,
    enabled: !!accessToken && !!creativeId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  return { data, isError, error, isLoading, isSuccess };
};

export const useGetCarts = () => {
  const { accessToken, session } = useCurrentUser();

  const getCartsRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/cart/getCarts`,

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery<
    Carts,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getCarts"],
    queryFn: getCartsRequest,
    enabled: !!session,
    refetchOnReconnect: true,
  });

  return { data, isError, error, isLoading };
};

export const useAddToCart = (
  productId: string,
  size: string,
  count: number
) => {
  const { accessToken } = useCurrentUser();

  const queryClient = useQueryClient();

  const addToCartRequest = async (productId: string) => {
    const res = await axios.put(
      `${api_base_url}/cart/addToCart`,

      {
        productId,
        count,
        size,
      },

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationKey: ["addToCart", productId],
    mutationFn: addToCartRequest,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["getCartItems"] });
    },
  });

  const addToCart = async () => {
    await mutateAsync(productId);
  };

  return { addToCart, data, isError, isPending, error };
};

export const useRemoveFromCart = (productId: string) => {
  const { accessToken } = useCurrentUser();

  const queryClient = useQueryClient();

  const removeFromCartRequest = async (productId: string) => {
    const res = await axios.put(
      `${api_base_url}/cart/removeFromCart`,

      {
        productId,
      },

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationKey: ["removeFromCart", productId],
    mutationFn: removeFromCartRequest,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["getCartItems"] });
    },
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

  const queryClient = useQueryClient();

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
      `${api_base_url}/cart/updateCartItemCount`,

      {
        productId,
        count,
        creativeId,
      },

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    { productId: string; count: number; creativeId: string }
  >({
    mutationKey: ["updateCartItemCount", productId],
    mutationFn: updateCartItemCountRequest,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["getCartItems"] });
    },
  });

  const updateCartItemCount = async () => {
    await mutateAsync({ productId, count, creativeId });
  };

  return { updateCartItemCount, data, isError, isPending, error };
};

export const useDeleteCart = (creativeId: string) => {
  const { accessToken } = useCurrentUser();

  const queryClient = useQueryClient();

  const deleteCartRequest = async (creativeId: string) => {
    const res = await axios.delete(
      `${api_base_url}/cart/deleteCart?cart=${creativeId}`,

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isPending, isError, error } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationKey: ["deleteCart", creativeId],
    mutationFn: deleteCartRequest,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["getCarts"] });
    },
  });

  const deleteCart = async () => {
    await mutateAsync(creativeId);
  };

  return { deleteCart, data, isPending, isError, error };
};
