import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const useCreateNotification = (notificationData: NotificationData) => {
  const { accessToken } = useCurrentUser();

  const createNotificationRequest = async (
    notificationData: NotificationData
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.post(
      `${api_base_url}/notification/createNotification`,

      { notificationData },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync } = useMutation({
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

  const getNotificationsRequest = async (): Promise<
    NotificationRes[] | undefined
  > => {
    const res = await axios.get(
      `${api_base_url}/notification/getNotifications`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getNotifications"],
    queryFn: getNotificationsRequest,
    enabled: !!accessToken,
  });

  return { data, isError, error, isLoading };
};

export const useDeleteNotification = (notificationId: string) => {
  const { accessToken } = useCurrentUser();

  const deleteNotificationRequest = async (
    notificationId: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.delete(
      `${api_base_url}/notification/deleteNotification?notificationId=${notificationId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isPending, isError, error } = useMutation({
    mutationKey: ["deleteNotification"],
    mutationFn: deleteNotificationRequest,
  });

  const deleteNotification = async () => {
    await mutateAsync(notificationId);
  };

  return { deleteNotification, data, isPending, isError, error };
};
