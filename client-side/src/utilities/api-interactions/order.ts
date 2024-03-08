import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const usePlaceAnOrder = (creativeId: string) => {
  const { accessToken } = useCurrentUser();

  const placeAnOrderRequest = async (
    creativeId: string
  ): Promise<{ message: string; order: Order } | undefined> => {
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

  const { mutateAsync, data, isPending, error, isError } = useMutation({
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

  const cancelAnOrderRequest = async (
    orderId: string
  ): Promise<{ message: string } | undefined> => {
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

  const { mutateAsync, data, isPending, error, isError } = useMutation({
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

  const confirmAnOrderRequest = async (
    orderId: string
  ): Promise<{ message: string } | undefined> => {
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

  const { mutateAsync, data, isPending, error, isError } = useMutation({
    mutationKey: ["confirmAnOrder"],
    mutationFn: confirmAnOrderRequest,
  });

  const confirmOrder = async () => {
    await mutateAsync(orderId);
  };

  return { confirmOrder, data, isPending, error, isError };
};

export const useGetOrder = (orderId: string) => {
  const getOrderRequest = async (): Promise<Order | undefined> => {
    const res = await axios.get(
      `${api_base_url}/order/getOrder?orderId=${orderId}`
    );

    return res.data;
  };

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["getOrder"],
    queryFn: getOrderRequest,
  });

  return { data, error, isError, isLoading };
};
