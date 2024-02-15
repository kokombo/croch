import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api_base_url } from "../../testing";
import { useCurrentUser } from ".";

/**
 * Function to create a new product
 * @param {FormData} productData
 * @returns object containing isPending, isError, isSuccess, data, createProduct, error
 */

export const createProductFunction = (productData: FormData) => {
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

export const updateProductFunction = (
  productData: FormData,
  productId: string
) => {
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

export const deleteProductFunction = (productId: string) => {
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

export const getCreativeOrders = (status: string) => {
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

export const getCustomerOrders = (status: string) => {
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

export const updateYearsOfExperienceFunction = (yearsOfExperience: number) => {
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

export const updateFunFactsFunction = (funFacts: string[]) => {
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

export const updatePersonalDescriptionFunction = (
  personalDescription: string
) => {
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

export const setBrandNameFunction = (brandName: string) => {
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

export const setBrandLogoFunction = (brandLogo: FormData) => {
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
  const { accessToken } = useCurrentUser();

  const getCartItemsRequest = async (): Promise<Cart | undefined> => {
    const res = await axios.get(
      `${api_base_url}/customer/getCartItems?creativeId=${creativeId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getCartItems"],
    queryFn: getCartItemsRequest,
    enabled: !!accessToken,
  });

  return { data, isError, error, isLoading };
};

export const getCarts = () => {
  const { accessToken } = useCurrentUser();

  const getCartsRequest = async (): Promise<Carts | undefined> => {
    const res = await axios.get(
      `${api_base_url}/customer/getCarts`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getCarts"],
    queryFn: getCartsRequest,
    enabled: !!accessToken,
  });

  return { data, isError, error, isLoading };
};

export const getWishlists = () => {
  const { accessToken } = useCurrentUser();

  const getWishlistsRequest = async () => {
    const res = await axios.get(
      `${api_base_url}/customer/getWishlists`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getWishlists"],
    queryFn: getWishlistsRequest,
    enabled: !!accessToken,
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
  const { accessToken } = useCurrentUser();

  const placeAnOrderRequest = async (
    creativeId: string
  ): Promise<{ message: string; order: Order } | undefined> => {
    const res = await axios.post(
      `${api_base_url}/customer/placeAnOrder`,

      {
        creativeId,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
  const { accessToken } = useCurrentUser();

  const addToCartRequest = async (
    productId: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.put(
      `${api_base_url}/customer/addToCart`,

      {
        productId,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
  const { accessToken } = useCurrentUser();

  const removeFromCartRequest = async (
    productId: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.put(
      `${api_base_url}/customer/removeFromCart`,

      {
        productId,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
  const { accessToken } = useCurrentUser();

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
          Authorization: `Bearer ${accessToken}`,
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
  const { accessToken } = useCurrentUser();

  const addAndRemoveWishlistRequest = async (
    productId: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.put(
      `${api_base_url}/customer/addAndRemoveWishlist`,

      {
        productId,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
  const { accessToken } = useCurrentUser();

  const cancelAnOrderRequest = async (
    orderId: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.patch(
      `${api_base_url}/customer/cancelAnOrder`,

      {
        orderId,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
  const { accessToken } = useCurrentUser();

  const confirmAnOrderRequest = async (
    orderId: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.patch(
      `${api_base_url}/customer/confirmAnOrder`,

      {
        orderId,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

export const deleteCartFunction = (creativeId: string) => {
  const { accessToken } = useCurrentUser();

  const deleteCartRequest = async (
    creativeId: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.delete(
      `${api_base_url}/customer/deleteCart?cart=${creativeId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isPending, isError, error } = useMutation({
    mutationKey: ["deleteCart", creativeId],
    mutationFn: deleteCartRequest,
  });

  const deleteCart = async () => {
    await mutateAsync(creativeId);
  };

  return { deleteCart, data, isPending, isError, error };
};

export const signupFunction = (signupData: SignupDataType) => {
  const signupRequest = async (signupData: SignupDataType) => {
    const res = await axios.post(`${api_base_url}/auth/signup`, { signupData });

    return res.data;
  };

  const { mutateAsync, data, isError, isPending, error } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signupRequest,
  });

  const signup = async () => {
    await mutateAsync(signupData);
  };

  return { signup, data, isError, isPending, error };
};

export const refreshAccessTokenFunction = () => {
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

export const sendEmailVerificationTokenFunction = (email: string) => {
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

export const verifyEmail = (token: string) => {
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

export const updatePasswordFunction = (passwordInfo: UpdatePassword) => {
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

export const sendForgotPasswordTokenFunction = (email: string) => {
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

export const resetPasswordFunction = (token: string) => {
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

export const deleteMyAccountFunction = () => {
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

export const createNotificationFunction = (
  notificationData: NotificationData
) => {
  const { accessToken } = useCurrentUser();

  const createNotificationRequest = async (
    notificationData: NotificationData
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.post(
      `${api_base_url}/notification/createNotification`,

      { notificationData },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync } = useMutation({
    mutationKey: ["createNotification"],
    mutationFn: createNotificationRequest,
  });

  const createNotification = async () => {
    await mutateAsync(notificationData);
  };

  return { createNotification };
};

export const getNotifications = () => {
  const { accessToken } = useCurrentUser();

  const getNotificationsRequest = async (): Promise<
    NotificationRes[] | undefined
  > => {
    const res = await axios.get(
      `${api_base_url}/notification/getNotifications`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getNotifications"],
    queryFn: getNotificationsRequest,
    enabled: !!accessToken,
  });

  return { data, isError, error, isLoading };
};

export const deleteNotificationFunction = (notificationId: string) => {
  const { accessToken } = useCurrentUser();

  const deleteNotificationRequest = async (
    notificationId: string
  ): Promise<{ message: string } | undefined> => {
    const res = await axios.delete(
      `${api_base_url}/notification/deleteNotification?notificationId=${notificationId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  };

  const { mutateAsync, data, isPending, isError, error } = useMutation({
    mutationKey: ["deleteNotification"],
    mutationFn: deleteNotificationRequest,
  });

  const deleteNotification = async () => {
    await mutateAsync(notificationId);
  };

  return { deleteNotification, data, isPending, isError, error };
};

export const addNewTagFunction = (tagData: FormData) => {
  const { accessToken } = useCurrentUser();

  const addNewTagRequest = async (
    tagData: FormData
  ): Promise<Tag | undefined> => {
    const res = await axios.post(
      `${api_base_url}/tag/addNewTag`,

      tagData,

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

  const { mutateAsync, data, isError, error, isPending } = useMutation({
    mutationKey: ["addNewTag"],
    mutationFn: addNewTagRequest,
  });

  const addNewTag = async () => {
    await mutateAsync(tagData);
  };

  return { addNewTag, data, isError, error, isPending };
};

export const updateTagFunction = (tagId: string, tagData: FormData) => {
  const { accessToken } = useCurrentUser();

  const updateTagRequest = async (
    tagData: FormData
  ): Promise<Tag | undefined> => {
    const res = await axios.put(
      `${api_base_url}/tag/updateTag?tagId=${tagId}`,

      tagData,

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

  const { mutateAsync, data, isError, error, isPending } = useMutation({
    mutationKey: ["updateTag", tagId],
    mutationFn: updateTagRequest,
  });

  const updateTag = async () => {
    await mutateAsync(tagData);
  };

  return { updateTag, data, isError, error, isPending };
};

export const getAllTags = () => {
  const getAllTagsRequest = async (): Promise<Tag[] | undefined> => {
    const res = await axios.get(`${api_base_url}/tag/getAllTags`);

    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAllTags"],
    queryFn: getAllTagsRequest,
  });

  return { data, isLoading, isError, error };
};

export const getOrder = (orderId: string) => {
  const getOrderRequest = async (): Promise<Order | undefined> => {
    const res = await axios.get(
      `${api_base_url}/order/getOrder?orderId=${orderId}`
    );

    return res.data;
  };

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["getOrder"],
    queryFn: getOrderRequest,
  });

  return { data, error, isError, isLoading };
};
