import axios, { type AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const useSetupCreativeAccount = () => {
  const { accessToken } = useCurrentUser();

  const setupCreativeAccountRequest = async (creativeAccountData: FormData) => {
    const res = await axios.patch(
      `${api_base_url}/creative/setupAccount`,

      creativeAccountData,

      {
        withCredentials: true,
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
    useMutation<Creative, AxiosError<ErrorResponse>, FormData>({
      mutationKey: ["setupCreativeAccount"],
      mutationFn: setupCreativeAccountRequest,
    });

  return { isPending, isError, isSuccess, data, mutateAsync, error };
};

export const useGetCreativeOrders = (status: string) => {
  const { accessToken, session } = useCurrentUser();

  const getCreativeOrdersRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/creative/getOrders?status=${status}`,
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

  const { data, isError, isLoading, error } = useQuery<
    Order[],
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getCreativeOrders"],
    queryFn: getCreativeOrdersRequest,
    enabled: !!session,
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
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
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

export const useGetCreativeById = (
  creativeId: string | undefined,
  condition: boolean
) => {
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
    queryKey: ["getCreativeById", creativeId],
    queryFn: getCreativeByIdRequest,
    enabled: !!creativeId && !!condition,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError, error };
};

export const useAccountSetupDone = () => {
  const { accessToken } = useCurrentUser();

  const accountSetupDoneRequest = async () => {
    const res = await axios.patch(
      `${api_base_url}/creative/accountSetupDone`,

      {},

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

  const { mutateAsync, error, data } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>
  >({
    mutationKey: ["accountSetupDone"],
    mutationFn: accountSetupDoneRequest,
  });

  const confirmAccountSetup = async () => {
    await mutateAsync();
  };

  return { confirmAccountSetup, error, data };
};
