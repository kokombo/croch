import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

type PlaceOrderOnSuccess = {
  onSuccess: (
    data: { message: string; order: Order },
    variables: string,
    context: unknown
  ) => unknown;
};

export const usePlaceAnOrder = (
  creativeId: string,
  props: PlaceOrderOnSuccess
) => {
  const { accessToken } = useCurrentUser();

  const placeAnOrderRequest = async (creativeId: string) => {
    const res = await axios.post(
      `${api_base_url}/order/placeAnOrder`,

      {
        creativeId,
      },

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Length": "application/json",
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isPending, error, isError, isSuccess } =
    useMutation<
      { message: string; order: Order },
      AxiosError<ErrorResponse>,
      string
    >({
      mutationKey: ["placeAnOrder"],
      mutationFn: placeAnOrderRequest,
      onSuccess: props.onSuccess,
    });

  const placeAnOrder = async () => {
    await mutateAsync(creativeId);
  };

  return { placeAnOrder, data, isPending, error, isError, isSuccess };
};

export const useCancelAnOrder = (orderId: string) => {
  const { accessToken } = useCurrentUser();

  const cancelAnOrderRequest = async (orderId: string) => {
    const res = await axios.patch(
      `${api_base_url}/order/cancelAnOrder`,

      {
        orderId,
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

  const { mutateAsync, data, isPending, error, isError, isSuccess } =
    useMutation<MessageResponse, AxiosError<ErrorResponse>, string>({
      mutationKey: ["cancelAnOrder"],
      mutationFn: cancelAnOrderRequest,
    });

  const cancelOrder = async () => {
    await mutateAsync(orderId);
  };

  return { cancelOrder, data, isPending, error, isError, isSuccess };
};

export const useConfirmAnOrder = (orderId: string) => {
  const { accessToken } = useCurrentUser();

  const confirmAnOrderRequest = async (orderId: string) => {
    const res = await axios.patch(
      `${api_base_url}/order/confirmAnOrder`,

      {
        orderId,
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

  const { mutateAsync, data, isPending, error, isError, isSuccess } =
    useMutation<MessageResponse, AxiosError<ErrorResponse>, string>({
      mutationKey: ["confirmAnOrder"],
      mutationFn: confirmAnOrderRequest,
    });

  const confirmOrder = async () => {
    await mutateAsync(orderId);
  };

  return { confirmOrder, data, isPending, error, isError, isSuccess };
};

export const useGetOrder = (orderId: string) => {
  const { accessToken } = useCurrentUser();

  const getOrderRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/order/getOrder?orderId=${orderId}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { data, error, isError, isLoading, isSuccess } = useQuery<
    Order,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getOrder"],
    queryFn: getOrderRequest,
  });

  return { data, error, isError, isLoading, isSuccess };
};

export const useGetCustomerOrders = (status: string) => {
  const { accessToken } = useCurrentUser();

  const getCustomerOrdersRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/order/getCustomerOrders?status=${status}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, isLoading, error, isSuccess, refetch, isRefetching } =
    useQuery<Order[], AxiosError<ErrorResponse>>({
      queryKey: ["getCustomerOrders"],
      queryFn: getCustomerOrdersRequest,
      enabled: !!accessToken,
      refetchOnWindowFocus: false,
    });

  return { data, isError, isLoading, error, isSuccess, refetch, isRefetching };
};
