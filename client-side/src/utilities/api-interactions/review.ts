import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
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

export const useGetCreativeReviews = () => {
  const { accessToken } = useCurrentUser();

  const getCreativeReviewsFunction = async () => {
    const res = await axios.get(
      `${api_base_url}/review/getCreativeReviews
    `,

      {
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
    queryKey: ["getCreativeReviews"],
    queryFn: getCreativeReviewsFunction,
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
  });

  return { data, isLoading, isError, error, isSuccess };
};
