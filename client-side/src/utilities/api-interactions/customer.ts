import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const useGetCartItems = (creativeId: string) => {
  const { accessToken } = useCurrentUser();

  const getCartItemsRequest = async (): Promise<Cart | undefined> => {
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

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getCartItems"],
    queryFn: getCartItemsRequest,
    enabled: !!accessToken,
  });

  return { data, isError, error, isLoading };
};

export const useGetCarts = () => {
  const { accessToken } = useCurrentUser();

  const getCartsRequest = async (): Promise<Carts | undefined> => {
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

  const { data, isError, error, isLoading } = useQuery({
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

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getWishlists"],
    queryFn: getWishlistsRequest,
    enabled: !!accessToken,
  });

  return { data, isError, error, isLoading };
};

export const useGetCreativeAllProducts = (creativeId: string) => {
  const getCreativeAllProductsRequest = async (): Promise<
    Product[] | undefined
  > => {
    const res = await axios.get(
      `${api_base_url}/customer/getCreativeAllProducts?creativeId=${creativeId}`
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getCreativeAllProducts"],
    queryFn: getCreativeAllProductsRequest,
  });

  return { data, isError, error, isLoading };
};
