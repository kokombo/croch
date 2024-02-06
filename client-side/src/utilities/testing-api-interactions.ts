import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { customer_token, creative_token, api_base_url } from "../../testing";

export const createProductFunction = (productData: FormData) => {
  const createProductRequest = async (productData: FormData) => {
    const res = await axios.post(
      `${api_base_url}/creative/createProduct`,

      productData,

      {
        headers: {
          Authorization: `Bearer ${creative_token}`,
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

export const getAllProducts = () => {
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

export const getProductById = (productId: string) => {
  const getProductByIdRequest = async (): Promise<Product | undefined> => {
    const res = await axios.get(
      `${api_base_url}/product/getProduct?productId=${productId}`
    );

    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getProductById"],
    queryFn: getProductByIdRequest,
  });

  return { data, isLoading, isError, error };
};

export const getMyProducts = () => {
  const getMyProductsRequest = async (): Promise<Product[] | undefined> => {
    const res = await axios.get(`${api_base_url}/creative/getProducts`, {
      headers: {
        Authorization: `Bearer ${creative_token}`,
      },
    });

    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getMyProducts"],
    queryFn: getMyProductsRequest,
  });

  return { data, isLoading, isError, error };
};

export const getCreativeOrders = (status: string) => {
  const getCreativeOrdersRequest = async (): Promise<Order[] | undefined> => {
    const res = await axios.get(
      `${api_base_url}/creative/getOrders?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${creative_token}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["getCreativeOrders"],
    queryFn: getCreativeOrdersRequest,
  });

  return { data, isError, isLoading, error };
};
