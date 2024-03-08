import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

type OnSuccess =
  | ((data: any, variables: SignupDataType, context: unknown) => unknown)
  | undefined;

export const useSignup = () => {
  const signupRequest = async (signupData: SignupDataType) => {
    const res = await axios.post(`${api_base_url}/auth/signup`, signupData);

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signupRequest,
  });

  return { data, isError, isPending, error, mutateAsync };
};

export const useRefreshAccessToken = () => {
  const refreshAccessTokenRequest = async () => {
    const res = await axios.post(`${api_base_url}/auth/refreshToken`, {
      credentials: "include",
    });

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
  const sendEmailVerificationTokenRequest = async (
    email: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.post(
      `${api_base_url}/auth/sendEmailVerificationToken`,

      { email }
    );

    return res.data;
  };

  const { mutateAsync, isPending, isError, error, data } = useMutation({
    mutationKey: ["sendEmailVerificationToken"],
    mutationFn: sendEmailVerificationTokenRequest,
  });

  const sendEmailVerificationToken = async () => {
    await mutateAsync(email);
  };

  return { sendEmailVerificationToken, isPending, isError, error, data };
};

export const useVerifyEmail = (token: string) => {
  const verifyEmailRequest = async (): Promise<
    { message: string } | undefined
  > => {
    const res = await axios.post(
      `${api_base_url}/auth/verifyEmail?token=${token}`
    );

    return res.data;
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["verifyEmail"],
    queryFn: verifyEmailRequest,
  });

  return { data, isPending, isError, error };
};

export const useUpdatePassword = (passwordInfo: UpdatePassword) => {
  const { accessToken } = useCurrentUser();

  const updatePasswordRequest = async (
    passwordInfo: UpdatePassword
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.patch(
      `${api_base_url}/auth/updatePassword`,

      passwordInfo,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: updatePasswordRequest,
  });

  const updatePassword = async () => {
    await mutateAsync(passwordInfo);
  };

  return { updatePassword, data, isError, error, isPending };
};

export const useSendForgotPasswordToken = (email: string) => {
  const sendForgotPasswordTokenRequest = async (
    email: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.post(
      `${api_base_url}/auth/sendForgotPasswordToken`,

      { email }
    );

    return res.data;
  };

  const { mutateAsync, isPending, isError, error, data } = useMutation({
    mutationKey: ["sendForgotPasswordToken"],
    mutationFn: sendForgotPasswordTokenRequest,
  });

  const sendForgotPasswordToken = async () => {
    await mutateAsync(email);
  };

  return { sendForgotPasswordToken, isPending, isError, error, data };
};

export const useResetPassword = (token: string) => {
  const resetPasswordRequest = async (
    token: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.patch(
      `${api_base_url}/auth/resetPassword?token=${token}`
    );

    return res.data;
  };

  const { mutateAsync, data, isPending, isError, error } = useMutation({
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
    const res = await axios.delete(`${api_base_url}/auth/deleteMyAccount`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  };

  const { mutateAsync, data, isPending, error, isError } = useMutation({
    mutationKey: ["deleteMyAccount"],
    mutationFn: deleteMyAccountRequest,
  });

  const deleteMyAccount = async () => {
    await mutateAsync();
  };

  return { deleteMyAccount, data, isPending, error, isError };
};
