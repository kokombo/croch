import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const useCreateNotification = (notificationData: NotificationData) => {
  const { accessToken } = useCurrentUser();

  const createNotificationRequest = async (
    notificationData: NotificationData
  ) => {
    const res = await axios.post(
      `${api_base_url}/notification/createNotification`,

      { notificationData },

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

  const { mutateAsync } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    NotificationData
  >({
    mutationKey: ["createNotification"],
    mutationFn: createNotificationRequest,
  });

  const createNotification = async () => {
    await mutateAsync(notificationData);
  };

  return { createNotification };
};

export const useGetNotifications = () => {
  const { accessToken } = useCurrentUser();

  const getNotificationsRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/notification/getNotifications`,

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
    NotificationRes[],
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getNotifications"],
    queryFn: getNotificationsRequest,
    enabled: !!accessToken,
    refetchOnReconnect: true,
  });

  return { data, isError, error, isLoading };
};

export const useDeleteNotification = (notificationId: string) => {
  const { accessToken } = useCurrentUser();

  const deleteNotificationRequest = async (notificationId: string) => {
    const res = await axios.delete(
      `${api_base_url}/notification/deleteNotification?notificationId=${notificationId}`,

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
    mutationKey: ["deleteNotification"],
    mutationFn: deleteNotificationRequest,
  });

  const deleteNotification = async () => {
    await mutateAsync(notificationId);
  };

  return { deleteNotification, data, isPending, isError, error };
};
