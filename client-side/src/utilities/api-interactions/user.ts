import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const useSignup = () => {
  const signupRequest = async (signupData: SignupDataType) => {
    const res = await axios.post(`${api_base_url}/user/signup`, signupData);

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation<
    any,
    AxiosError<ErrorResponse>,
    SignupDataType
  >({
    mutationKey: ["signup"],
    mutationFn: signupRequest,
  });

  return { data, isError, isPending, error, mutateAsync };
};

export const useRefreshAccessToken = () => {
  const refreshAccessTokenRequest = async () => {
    const res = await axios.post(`${api_base_url}/auth/refreshToken`, {});

    return res.data;
  };

  const { mutateAsync } = useMutation({
    mutationKey: ["refreshAccessToken"],
    mutationFn: refreshAccessTokenRequest,
  });

  const refreshAccessToken = async () => {
    await mutateAsync();
  };

  return { refreshAccessToken };
};

export const useSendEmailVerificationToken = (email: string) => {
  const sendEmailVerificationTokenRequest = async (email: string) => {
    const res = await axios.post(
      `${api_base_url}/user/sendEmailVerificationToken`,

      { email }
    );

    return res.data;
  };

  const { mutateAsync, isPending, isError, error, data } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationKey: ["sendEmailVerificationToken"],
    mutationFn: sendEmailVerificationTokenRequest,
  });

  const sendEmailVerificationToken = async () => {
    await mutateAsync(email);
  };

  return { sendEmailVerificationToken, isPending, isError, error, data };
};

export const useVerifyEmail = (token: string) => {
  const verifyEmailRequest = async () => {
    const res = await axios.post(
      `${api_base_url}/user/verifyEmail?token=${token}`
    );

    return res.data;
  };

  const { data, isPending, isError, error } = useQuery<
    MessageResponse,
    AxiosError<ErrorResponse>,
    string
  >({
    queryKey: ["verifyEmail"],
    queryFn: verifyEmailRequest,
  });

  return { data, isPending, isError, error };
};

export const useUpdatePassword = (passwordInfo: UpdatePassword) => {
  const { accessToken } = useCurrentUser();

  const updatePasswordRequest = async (passwordInfo: UpdatePassword) => {
    const res = await axios.patch(
      `${api_base_url}/user/updatePassword`,

      passwordInfo,

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
    UpdatePassword
  >({
    mutationKey: ["updatePassword"],
    mutationFn: updatePasswordRequest,
  });

  const updatePassword = async () => {
    await mutateAsync(passwordInfo);
  };

  return { updatePassword, data, isError, error, isPending };
};

export const useSendForgotPasswordToken = (email: string) => {
  const sendForgotPasswordTokenRequest = async (email: string) => {
    const res = await axios.post(
      `${api_base_url}/user/sendForgotPasswordToken`,

      { email }
    );

    return res.data;
  };

  const { mutateAsync, isPending, isError, error, data } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationKey: ["sendForgotPasswordToken"],
    mutationFn: sendForgotPasswordTokenRequest,
  });

  const sendForgotPasswordToken = async () => {
    await mutateAsync(email);
  };

  return { sendForgotPasswordToken, isPending, isError, error, data };
};

export const useResetPassword = (token: string) => {
  const resetPasswordRequest = async (token: string) => {
    const res = await axios.patch(
      `${api_base_url}/user/resetPassword?token=${token}`
    );

    return res.data;
  };

  const { mutateAsync, data, isPending, isError, error } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationKey: ["resetPassword"],
    mutationFn: resetPasswordRequest,
  });

  const resetPassword = async () => {
    await mutateAsync(token);
  };

  return { resetPassword, data, isPending, isError, error };
};

export const useDeleteMyAccount = () => {
  const { accessToken } = useCurrentUser();

  const deleteMyAccountRequest = async () => {
    const res = await axios.delete(`${api_base_url}/user/deleteMyAccount`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  };

  const { mutateAsync, data, isPending, error, isError } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>
  >({
    mutationKey: ["deleteMyAccount"],
    mutationFn: deleteMyAccountRequest,
  });

  const deleteMyAccount = async () => {
    await mutateAsync();
  };

  return { deleteMyAccount, data, isPending, error, isError };
};
