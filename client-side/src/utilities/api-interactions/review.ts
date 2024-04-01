import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const useGiveReview = (reviewData: ReviewData) => {
  const { accessToken } = useCurrentUser();

  const giveReviewFunction = async (reviewData: ReviewData) => {
    const res = await axios.post(
      `${api_base_url}/review/giveReview
    `,

      reviewData,

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, isPending, isError, error, isSuccess, data } =
    useMutation<Review, AxiosError<ErrorResponse>, ReviewData>({
      mutationKey: ["giveReview"],
      mutationFn: giveReviewFunction,
    });

  const postReview = async () => {
    await mutateAsync(reviewData);
  };

  return { postReview, isPending, isError, error, isSuccess, data };
};

export const useGetCreativeReviews = (creativeId: string) => {
  const getCreativeReviewsFunction = async () => {
    const res = await axios.get(
      `${api_base_url}/review/getCreativeReviews?creativeId=${creativeId}
    `
    );

    return res.data;
  };

  const { data, isLoading, isError, error, isSuccess } = useQuery<
    Review[],
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getCreativeReviews"],
    queryFn: getCreativeReviewsFunction,
    refetchOnReconnect: true,
  });

  return { data, isLoading, isError, error, isSuccess };
};

export const useGetCustomerPostedReviews = () => {
  const { accessToken } = useCurrentUser();

  const getCustomerPostedReviewsFunction = async () => {
    const res = await axios.get(
      `${api_base_url}/review/getCustomerPostedReviews
    `,

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { data, isLoading, isError, error, isSuccess } = useQuery<
    Review[],
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getCustomerPostedReviews"],
    queryFn: getCustomerPostedReviewsFunction,
    refetchOnReconnect: true,
  });

  return { data, isLoading, isError, error, isSuccess };
};
