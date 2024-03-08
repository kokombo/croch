import axios from "axios";
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

  const createProductRequest = async (
    productData: FormData
  ): Promise<Product | undefined> => {
    const res = await axios.post(
      `${api_base_url}/creative/createProduct`,

      productData,

      {
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
    useMutation({
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

  const updateProductRequest = async (
    productData: FormData
  ): Promise<Product | undefined> => {
    const res = await axios.put(
      `${api_base_url}/creative/updateProduct?productId=${productId}`,

      productData,

      {
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
    useMutation({
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

  const deleteProductRequest = async (
    productId: string
  ): Promise<{ message: string }> => {
    const res = await axios.delete(
      `${api_base_url}/creative/deleteProduct?productId=${productId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, isPending, isError, isSuccess, data, error } =
    useMutation({
      mutationKey: ["deleteProduct"],
      mutationFn: deleteProductRequest,
    });

  const deleteProduct = async () => {
    await mutateAsync(productId);
  };

  return { isPending, isError, isSuccess, data, deleteProduct, error };
};

export const useGetAllProducts = () => {
  const getAllProductsRequest = async (): Promise<Product[] | undefined> => {
    const res = await axios.get(`${api_base_url}/product/getAllProducts`);

    return res.data;
  };

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProductsRequest,
  });

  return { data, isLoading, isError, error, isSuccess };
};

export const useGetProductById = (productId: string) => {
  const getProductByIdRequest = async (): Promise<Product | undefined> => {
    const res = await axios.get(
      `${api_base_url}/product/getProduct?productId=${productId}`
    );

    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getProductById", productId],
    queryFn: getProductByIdRequest,
  });

  return { data, isLoading, isError, error };
};

export const useGetMyProducts = () => {
  const { accessToken } = useCurrentUser();

  const getMyProductsRequest = async (): Promise<Product[] | undefined> => {
    const res = await axios.get(`${api_base_url}/creative/getProducts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getMyProducts"],
    queryFn: getMyProductsRequest,
    enabled: !!accessToken,
  });

  return { data, isLoading, isError, error };
};
