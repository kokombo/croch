import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

export const useGetCreativeOrders = (status: string) => {
  const { accessToken } = useCurrentUser();

  const getCreativeOrdersRequest = async (): Promise<Order[] | undefined> => {
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

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["getCreativeOrders"],
    queryFn: getCreativeOrdersRequest,
    enabled: !!accessToken,
  });

  return { data, isError, isLoading, error };
};

export const useGetCustomerOrders = (status: string) => {
  const { accessToken } = useCurrentUser();

  const getCustomerOrdersRequest = async (): Promise<Order[] | undefined> => {
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

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["getCustomerOrders"],
    queryFn: getCustomerOrdersRequest,
    enabled: !!accessToken,
  });

  return { data, isError, isLoading, error };
};

export const useUpdateYearsOfExperience = (yearsOfExperience: number) => {
  const { accessToken } = useCurrentUser();

  const updateYearsOfExperienceRequest = async (
    years: number
  ): Promise<number | undefined> => {
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

  const { data, isPending, isError, error, mutateAsync } = useMutation({
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

  const updateFunFactsRequest = async (
    funFacts: string[]
  ): Promise<string[] | undefined> => {
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

  const { data, isPending, isError, error, mutateAsync } = useMutation({
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
  ): Promise<string | undefined> => {
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

  const { data, isPending, isError, error, mutateAsync } = useMutation({
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

  const setBrandNameRequest = async (
    brandName: string
  ): Promise<string | undefined> => {
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

  const { data, isError, isPending, error, mutateAsync } = useMutation({
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

  const setBrandLogoRequest = async (
    brandLogo: FormData
  ): Promise<string | undefined> => {
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

  const { data, isError, isPending, error, mutateAsync } = useMutation({
    mutationKey: ["setBrandLogo"],
    mutationFn: setBrandLogoRequest,
  });

  const setBrandLogo = async () => {
    await mutateAsync(brandLogo);
  };

  return { setBrandLogo, data, isError, isPending, error };
};

export const useGetCreativeById = (creativeId: string) => {
  const getCreativeByIdRequest = async (): Promise<Creative | undefined> => {
    const res = await axios.get(
      `${api_base_url}/creative/getCreativeById?creativeId=${creativeId}`
    );

    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getCreativeById"],
    queryFn: getCreativeByIdRequest,
  });

  return { data, isLoading, isError, error };
};
