import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const usePlaceAnOrder = (creativeId: string) => {
  const { accessToken } = useCurrentUser();

  const placeAnOrderRequest = async (creativeId: string) => {
    const res = await axios.post(
      `${api_base_url}/customer/placeAnOrder`,

      {
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

  const { mutateAsync, data, isPending, error, isError } = useMutation<
    { message: string; order: Order },
    AxiosError<ErrorResponse>,
    string
  >({
    mutationKey: ["placeAnOrder"],
    mutationFn: placeAnOrderRequest,
  });

  const placeAnOrder = async () => {
    await mutateAsync(creativeId);
  };

  return { placeAnOrder, data, isPending, error, isError };
};

export const useCancelAnOrder = (orderId: string) => {
  const { accessToken } = useCurrentUser();

  const cancelAnOrderRequest = async (orderId: string) => {
    const res = await axios.patch(
      `${api_base_url}/customer/cancelAnOrder`,

      {
        orderId,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isPending, error, isError } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationKey: ["cancelAnOrder"],
    mutationFn: cancelAnOrderRequest,
  });

  const cancelOrder = async () => {
    await mutateAsync(orderId);
  };

  return { cancelOrder, data, isPending, error, isError };
};

export const useConfirmAnOrder = (orderId: string) => {
  const { accessToken } = useCurrentUser();

  const confirmAnOrderRequest = async (orderId: string) => {
    const res = await axios.patch(
      `${api_base_url}/customer/confirmAnOrder`,

      {
        orderId,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isPending, error, isError } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationKey: ["confirmAnOrder"],
    mutationFn: confirmAnOrderRequest,
  });

  const confirmOrder = async () => {
    await mutateAsync(orderId);
  };

  return { confirmOrder, data, isPending, error, isError };
};

export const useGetOrder = (orderId: string) => {
  const getOrderRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/order/getOrder?orderId=${orderId}`
    );

    return res.data;
  };

  const { data, error, isError, isLoading } = useQuery<
    Order,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getOrder"],
    queryFn: getOrderRequest,
  });

  return { data, error, isError, isLoading };
};
