import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { customer_token, creative_token, api_base_url } from "../../testing";

export const createProductFunction = (productData: FormData) => {
  const createProductRequest = async (
    productData: FormData
  ): Promise<Product | undefined> => {
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

export const updateProductFunction = (
  productData: FormData,
  productId: string
) => {
  const updateProductRequest = async (
    productData: FormData
  ): Promise<Product | undefined> => {
    const res = await axios.put(
      `${api_base_url}/creative/updateProduct?productId=${productId}`,

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
      mutationKey: ["updateProduct"],
      mutationFn: updateProductRequest,
    });

  const updateProduct = async () => {
    await mutateAsync(productData);
  };

  return { isPending, isError, isSuccess, data, updateProduct, error };
};

export const deleteProductFunction = (productId: string) => {
  const deleteProductRequest = async (
    productId: string
  ): Promise<{ message: string }> => {
    const res = await axios.delete(
      `${api_base_url}/creative/deleteProduct?productId=${productId}`,

      {
        headers: {
          Authorization: `Bearer ${creative_token}`,
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
    queryKey: ["getProductById", productId],
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

export const getCustomerOrders = (status: string) => {
  const getCustomerOrdersRequest = async (): Promise<Order[] | undefined> => {
    const res = await axios.get(
      `${api_base_url}/customer/getOrders?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${customer_token}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["getCustomerOrders"],
    queryFn: getCustomerOrdersRequest,
  });

  return { data, isError, isLoading, error };
};

export const updateYearsOfExperienceFunction = (yearsOfExperience: number) => {
  const updateYearsOfExperienceRequest = async (
    years: number
  ): Promise<number | undefined> => {
    const res = await axios.patch(
      `${api_base_url}/creative/updateYearsOfExperience`,

      { yearsOfExperience },

      {
        headers: {
          Authorization: `Bearer ${creative_token}`,
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

export const updateFunFactsFunction = (funFacts: string[]) => {
  const updateFunFactsRequest = async (
    funFacts: string[]
  ): Promise<string[] | undefined> => {
    const res = await axios.patch(
      `${api_base_url}/creative/updateFunFacts`,

      { funFacts },

      {
        headers: {
          Authorization: `Bearer ${creative_token}`,
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

export const updatePersonalDescriptionFunction = (
  personalDescription: string
) => {
  const updatePersonalDescriptionRequest = async (
    personalDescription: string
  ): Promise<string | undefined> => {
    const res = await axios.patch(
      `${api_base_url}/creative/updatePersonalDescription`,

      { personalDescription },

      {
        headers: {
          Authorization: `Bearer ${creative_token}`,
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

export const setBrandNameFunction = (brandName: string) => {
  const setBrandNameRequest = async (
    brandName: string
  ): Promise<string | undefined> => {
    const res = await axios.patch(
      `${api_base_url}/creative/setBrandName`,

      { brandName },

      {
        headers: {
          Authorization: `Bearer ${creative_token}`,
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

export const setBrandLogoFunction = (brandLogo: FormData) => {
  const setBrandLogoRequest = async (
    brandLogo: FormData
  ): Promise<string | undefined> => {
    const res = await axios.patch(
      `${api_base_url}/creative/setBrandLogo`,

      brandLogo,

      {
        headers: {
          Authorization: `Bearer ${creative_token}`,
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

export const getCreativeById = (creativeId: string) => {
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

export const getCartItems = (creativeId: string) => {
  const getCartItemsRequest = async (): Promise<Cart | undefined> => {
    const res = await axios.get(
      `${api_base_url}/customer/getCartItems?creativeId=${creativeId}`,

      {
        headers: {
          Authorization: `Bearer ${customer_token}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getCartItems"],
    queryFn: getCartItemsRequest,
  });

  return { data, isError, error, isLoading };
};

export const getCarts = () => {
  const getCartsRequest = async (): Promise<Carts | undefined> => {
    const res = await axios.get(
      `${api_base_url}/customer/getCarts`,

      {
        headers: {
          Authorization: `Bearer ${customer_token}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getCarts"],
    queryFn: getCartsRequest,
  });

  return { data, isError, error, isLoading };
};

export const getWishlists = () => {
  const getWishlistsRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/customer/getWishlists`,

      {
        headers: {
          Authorization: `Bearer ${customer_token}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getWishlists"],
    queryFn: getWishlistsRequest,
  });

  return { data, isError, error, isLoading };
};

export const getCreativeAllProducts = (creativeId: string) => {
  const getCreativeAllProductsRequest = async (): Promise<
    Product[] | undefined
  > => {
    const res = await axios.get(
      `${api_base_url}/customer/getCreativeAllProducts?creativeId=${creativeId}`
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getCreativeAllProducts"],
    queryFn: getCreativeAllProductsRequest,
  });

  return { data, isError, error, isLoading };
};

export const placeAnOrderFunction = (creativeId: string) => {
  const placeAnOrderRequest = async (
    creativeId: string
  ): Promise<{ message: string; order: Order }> => {
    const res = await axios.post(
      `${api_base_url}/customer/placeAnOrder`,

      {
        creativeId,
      },

      {
        headers: {
          Authorization: `Bearer ${customer_token}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isPending, error, isError } = useMutation({
    mutationKey: ["placeAnOrder"],
    mutationFn: placeAnOrderRequest,
  });

  const placeAnOrder = async () => {
    await mutateAsync(creativeId);
  };

  return { placeAnOrder, data, isPending, error, isError };
};

export const addToCartFunction = (productId: string) => {
  const addToCartRequest = async (
    productId: string
  ): Promise<{ message: string }> => {
    const res = await axios.put(
      `${api_base_url}/customer/addToCart`,

      {
        productId,
      },

      {
        headers: {
          Authorization: `Bearer ${customer_token}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation({
    mutationKey: ["addToCart", productId],
    mutationFn: addToCartRequest,
  });

  const addToCart = async () => {
    await mutateAsync(productId);
  };

  return { addToCart, data, isError, isPending, error };
};

export const removeFromCartFunction = (productId: string) => {
  const removeFromCartRequest = async (
    productId: string
  ): Promise<{ message: string }> => {
    const res = await axios.put(
      `${api_base_url}/customer/removeFromCart`,

      {
        productId,
      },

      {
        headers: {
          Authorization: `Bearer ${customer_token}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation({
    mutationKey: ["removeFromCart", productId],
    mutationFn: removeFromCartRequest,
  });

  const removeFromCart = async () => {
    await mutateAsync(productId);
  };

  return { removeFromCart, data, isError, isPending, error };
};

export const updateCartItemCountFunction = (
  productId: string,
  count: number,
  creativeId: string
) => {
  const updateCartItemCountRequest = async ({
    productId,
    count,
    creativeId,
  }: {
    productId: string;
    count: number;
    creativeId: string;
  }) => {
    const res = await axios.put(
      `${api_base_url}/customer/updateCartItemCount`,

      {
        productId,
        count,
        creativeId,
      },

      {
        headers: {
          Authorization: `Bearer ${customer_token}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation({
    mutationKey: ["updateCartItemCount", productId],
    mutationFn: updateCartItemCountRequest,
  });

  const updateCartItemCount = async () => {
    await mutateAsync({ productId, count, creativeId });
  };

  return { updateCartItemCount, data, isError, isPending, error };
};

export const addAndRemoveWishlistFunction = (productId: string) => {
  const addAndRemoveWishlistRequest = async (
    productId: string
  ): Promise<{ message: string }> => {
    const res = await axios.put(
      `${api_base_url}/customer/addAndRemoveWishlist`,

      {
        productId,
      },

      {
        headers: {
          Authorization: `Bearer ${customer_token}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation({
    mutationKey: ["addAndRemoveWishlist"],
    mutationFn: addAndRemoveWishlistRequest,
  });

  const addAndRemoveWishlist = async () => {
    await mutateAsync(productId);
  };

  return { addAndRemoveWishlist, data, isError, isPending, error };
};

export const cancelAnOrderFunction = (orderId: string) => {
  const cancelAnOrderRequest = async (
    orderId: string
  ): Promise<{ message: string }> => {
    const res = await axios.patch(
      `${api_base_url}/customer/cancelAnOrder`,

      {
        orderId,
      },

      {
        headers: {
          Authorization: `Bearer ${customer_token}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isPending, error, isError } = useMutation({
    mutationKey: ["cancelAnOrder"],
    mutationFn: cancelAnOrderRequest,
  });

  const cancelOrder = async () => {
    await mutateAsync(orderId);
  };

  return { cancelOrder, data, isPending, error, isError };
};

export const confirmAnOrderFunction = (orderId: string) => {
  const confirmAnOrderRequest = async (
    orderId: string
  ): Promise<{ message: string }> => {
    const res = await axios.patch(
      `${api_base_url}/customer/confirmAnOrder`,

      {
        orderId,
      },

      {
        headers: {
          Authorization: `Bearer ${customer_token}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isPending, error, isError } = useMutation({
    mutationKey: ["confirmAnOrder"],
    mutationFn: confirmAnOrderRequest,
  });

  const confirmOrder = async () => {
    await mutateAsync(orderId);
  };

  return { confirmOrder, data, isPending, error, isError };
};
