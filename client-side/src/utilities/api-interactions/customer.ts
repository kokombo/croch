import axios, { AxiosError } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const useAddAndRemoveWishlist = (productId: string) => {
  const { accessToken } = useCurrentUser();

  const queryClient = useQueryClient();

  const addAndRemoveWishlistRequest = async (productId: string) => {
    const res = await axios.put(
      `${api_base_url}/customer/addAndRemoveWishlist`,

      {
        productId,
      },

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
    mutationKey: ["addAndRemoveWishlist"],
    mutationFn: addAndRemoveWishlistRequest,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["getWishlists"] });
    },
  });

  const addAndRemoveWishlist = async () => {
    await mutateAsync(productId);
  };

  return { addAndRemoveWishlist, data, isError, isPending, error };
};

export const useGetWishlists = () => {
  const { accessToken, isCustomer } = useCurrentUser();

  const getWishlistsRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/customer/getWishlists`,

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, error, isLoading, isSuccess, isPending, isStale } =
    useQuery<Product[], AxiosError<ErrorResponse>>({
      queryKey: ["getWishlists"],
      queryFn: getWishlistsRequest,
      enabled: !!accessToken && !!isCustomer,
      refetchOnReconnect: true,
    });

  return { data, isError, error, isLoading, isSuccess, isPending, isStale };
};

export const useGetCreativeAllProducts = (creativeId: string) => {
  const getCreativeAllProductsRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/customer/getCreativeAllProducts?creativeId=${creativeId}`
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery<
    Product[],
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getCreativeAllProducts"],
    queryFn: getCreativeAllProductsRequest,
    refetchOnReconnect: true,
  });

  return { data, isError, error, isLoading };
};
