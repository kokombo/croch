import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const useGetCartItems = (creativeId: string) => {
  const { accessToken } = useCurrentUser();

  const getCartItemsRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/customer/getCartItems?creativeId=${creativeId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery<
    Cart,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getCartItems"],
    queryFn: getCartItemsRequest,
    enabled: !!accessToken,
  });

  return { data, isError, error, isLoading };
};

export const useGetCarts = () => {
  const { accessToken } = useCurrentUser();

  const getCartsRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/customer/getCarts`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
    enabled: !!accessToken,
  });

  return { data, isError, error, isLoading };
};

export const useGetWishlists = () => {
  const { accessToken } = useCurrentUser();

  const getWishlistsRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/customer/getWishlists`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery<
    Partial<Product>[],
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getWishlists"],
    queryFn: getWishlistsRequest,
    enabled: !!accessToken,
  });

  return { data, isError, error, isLoading };
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
  });

  return { data, isError, error, isLoading };
};
