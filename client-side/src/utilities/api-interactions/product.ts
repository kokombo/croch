import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api_base_url } from "../constant";
import { useCurrentUser } from "..";

/**
 * Function to create a new product
 * @param {FormData} productData
 * @returns object containing isPending, isError, isSuccess, data, createProduct, error
 */

export const useCreateProduct = (productData: FormData) => {
  const { accessToken } = useCurrentUser();

  const createProductRequest = async (productData: FormData) => {
    const res = await axios.post(
      `${api_base_url}/product/createProduct`,

      productData,

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, isPending, isError, isSuccess, data, error } =
    useMutation<Product, AxiosError<ErrorResponse>, FormData>({
      mutationKey: ["createProduct"],
      mutationFn: createProductRequest,
    });

  const createProduct = async () => {
    await mutateAsync(productData);
  };

  return { isPending, isError, isSuccess, data, createProduct, error };
};

export const useUpdateProduct = (productData: FormData, productId: string) => {
  const { accessToken } = useCurrentUser();

  const updateProductRequest = async (productData: FormData) => {
    const res = await axios.put(
      `${api_base_url}/product/updateProduct?productId=${productId}`,

      productData,

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, isPending, isError, isSuccess, data, error } =
    useMutation<Product, AxiosError<ErrorResponse>, FormData>({
      mutationKey: ["updateProduct"],
      mutationFn: updateProductRequest,
    });

  const updateProduct = async () => {
    await mutateAsync(productData);
  };

  return { isPending, isError, isSuccess, data, updateProduct, error };
};

export const useDeleteProduct = (productId: string) => {
  const { accessToken } = useCurrentUser();

  const deleteProductRequest = async (productId: string) => {
    const res = await axios.delete(
      `${api_base_url}/product/deleteProduct?productId=${productId}`,

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, isPending, isError, isSuccess, data, error } =
    useMutation<MessageResponse, AxiosError<ErrorResponse>, string>({
      mutationKey: ["deleteProduct"],
      mutationFn: deleteProductRequest,
    });

  const deleteProduct = async () => {
    await mutateAsync(productId);
  };

  return { isPending, isError, isSuccess, data, deleteProduct, error };
};

export const useGetAllProducts = () => {
  const getAllProductsRequest = async () => {
    const res = await axios.get(`${api_base_url}/product/getAllProducts`);

    return res.data;
  };

  const { data, isLoading, isError, error, isSuccess, isStale, isPending } =
    useQuery<Product[], AxiosError<ErrorResponse>>({
      queryKey: ["getAllProducts"],
      queryFn: getAllProductsRequest,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    });

  return { data, isLoading, isError, error, isSuccess, isStale, isPending };
};

export const useGetProductById = (productId: string) => {
  const getProductByIdRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/product/getProduct?productId=${productId}`
    );

    return res.data;
  };

  const { data, isLoading, isError, error, isSuccess, isStale, isPending } =
    useQuery<Product, AxiosError<ErrorResponse>>({
      queryKey: ["getProductById", productId],
      queryFn: getProductByIdRequest,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    });

  return { data, isLoading, isError, error, isSuccess, isStale, isPending };
};

export const useGetMyProducts = () => {
  const { accessToken } = useCurrentUser();

  const getMyProductsRequest = async () => {
    const res = await axios.get(`${api_base_url}/product/getCreativeProducts`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    Product[],
    AxiosError<ErrorResponse>
  >({
    queryKey: ["getMyProducts"],
    queryFn: getMyProductsRequest,
    enabled: !!accessToken,
    refetchOnReconnect: true,
  });

  return { data, isLoading, isError, error };
};
