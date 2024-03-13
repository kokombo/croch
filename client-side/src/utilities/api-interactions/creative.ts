import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const useSetupAccount = (creativeAccountData: FormData) => {
  const { accessToken } = useCurrentUser();

  const setupCreativeAccountRequest = async (creativeAccountData: FormData) => {
    const res = await axios.patch(
      `${api_base_url}/creative/setupAccount`,

      creativeAccountData,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, isPending, isError, isSuccess, data, error } =
    useMutation<MessageResponse, AxiosError<ErrorResponse>, FormData>({
      mutationKey: ["setupCreativeAccount"],
      mutationFn: setupCreativeAccountRequest,
    });

  const setupCreativeAccount = async () => {
    await mutateAsync(creativeAccountData);
  };

  return { isPending, isError, isSuccess, data, setupCreativeAccount, error };
};

export const useGetCreativeOrders = (status: string) => {
  const { accessToken } = useCurrentUser();

  const getCreativeOrdersRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/creative/getOrders?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, isLoading, error } = useQuery<
    Order[],
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getCreativeOrders"],
    queryFn: getCreativeOrdersRequest,
    enabled: !!accessToken,
  });

  return { data, isError, isLoading, error };
};

export const useGetCustomerOrders = (status: string) => {
  const { accessToken } = useCurrentUser();

  const getCustomerOrdersRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/customer/getOrders?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, isLoading, error } = useQuery<
    Order[],
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getCustomerOrders"],
    queryFn: getCustomerOrdersRequest,
    enabled: !!accessToken,
  });

  return { data, isError, isLoading, error };
};

export const useUpdateYearsOfExperience = (yearsOfExperience: number) => {
  const { accessToken } = useCurrentUser();

  const updateYearsOfExperienceRequest = async () => {
    const res = await axios.patch(
      `${api_base_url}/creative/updateYearsOfExperience`,

      { yearsOfExperience },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  };

  const { data, isPending, isError, error, mutateAsync } = useMutation<
    number,
    AxiosError<ErrorResponse>,
    number
  >({
    mutationKey: ["updateYearsOfExperience"],
    mutationFn: updateYearsOfExperienceRequest,
  });

  const updateYearsOfExperience = async () => {
    await mutateAsync(yearsOfExperience);
  };

  return { data, isPending, isError, error, updateYearsOfExperience };
};

export const useUpdateFunFacts = (funFacts: string[]) => {
  const { accessToken } = useCurrentUser();

  const updateFunFactsRequest = async (funFacts: string[]) => {
    const res = await axios.patch(
      `${api_base_url}/creative/updateFunFacts`,

      { funFacts },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  };

  const { data, isPending, isError, error, mutateAsync } = useMutation<
    string[],
    AxiosError<ErrorResponse>,
    string[]
  >({
    mutationKey: ["updateFunFacts"],
    mutationFn: updateFunFactsRequest,
  });

  const updateFunFacts = async () => {
    await mutateAsync(funFacts);
  };

  return { data, isPending, isError, error, updateFunFacts };
};

export const useUpdatePersonalDescription = (personalDescription: string) => {
  const { accessToken } = useCurrentUser();

  const updatePersonalDescriptionRequest = async (
    personalDescription: string
  ) => {
    const res = await axios.patch(
      `${api_base_url}/creative/updatePersonalDescription`,

      { personalDescription },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  };

  const { data, isPending, isError, error, mutateAsync } = useMutation<
    string,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationKey: ["updatePersonalDescription"],
    mutationFn: updatePersonalDescriptionRequest,
  });

  const updatePersonalDescription = async () => {
    await mutateAsync(personalDescription);
  };

  return { data, isPending, isError, error, updatePersonalDescription };
};

export const useSetBrandName = (brandName: string) => {
  const { accessToken } = useCurrentUser();

  const setBrandNameRequest = async (brandName: string) => {
    const res = await axios.patch(
      `${api_base_url}/creative/setBrandName`,

      { brandName },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  };

  const { data, isError, isPending, error, mutateAsync } = useMutation<
    string,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationKey: ["setBrandName"],
    mutationFn: setBrandNameRequest,
  });

  const setBrandName = async () => {
    await mutateAsync(brandName);
  };

  return { setBrandName, data, isError, isPending, error };
};

export const useSetBrandLogo = (brandLogo: FormData) => {
  const { accessToken } = useCurrentUser();

  const setBrandLogoRequest = async (brandLogo: FormData) => {
    const res = await axios.patch(
      `${api_base_url}/creative/setBrandLogo`,

      brandLogo,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  };

  const { data, isError, isPending, error, mutateAsync } = useMutation<
    string,
    AxiosError<ErrorResponse>,
    FormData
  >({
    mutationKey: ["setBrandLogo"],
    mutationFn: setBrandLogoRequest,
  });

  const setBrandLogo = async () => {
    await mutateAsync(brandLogo);
  };

  return { setBrandLogo, data, isError, isPending, error };
};

export const useGetCreativeById = (creativeId: string) => {
  const getCreativeByIdRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/creative/getCreativeById?creativeId=${creativeId}`
    );

    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    Creative,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getCreativeById"],
    queryFn: getCreativeByIdRequest,
  });

  return { data, isLoading, isError, error };
};
