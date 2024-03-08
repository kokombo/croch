// import { useEffect, useState } from "react";
// import {
//   useCreateProduct,
//   useGetAllProducts,
//   useGetProductById,
//   useGetMyProducts,
//   useGetCreativeOrders,
//   useGetCreativeAllProducts,
//   useUpdateYearsOfExperience,
//   useUpdateFunFacts,
//   useUpdatePersonalDescription,
//   useSetBrandName,
//   useSetBrandLogo,
//   useUpdateProduct,
//   useGetCreativeById,
//   useDeleteProduct,
//   useGetCartItems,
//   useGetCustomerOrders,
//   useGetCarts,
//   useGetWishlists,
//   usePlaceAnOrder,
//   useAddToCart,
//   useRemoveFromCart,
//   useUpdateCartItemCount,
//   useAddAndRemoveWishlist,
//   useCancelAnOrder,
//   useConfirmAnOrder,
//   useDeleteCart,
//   useDeleteNotification,
//   useAddNewTag,
//   useGetAllTags,
//   useUpdateTag,
//   useSendEmailVerificationToken,
//   useSendForgotPasswordToken,
//   useUpdatePassword,
//   useSignup,
// } from "@/utilities/testing-api-interactions";
// import { signIn, signOut } from "next-auth/react";
// import { useCurrentUser } from "@/utilities";

// const ApiTesting = () => {
//   const { accessToken } = useCurrentUser();

//   const [photos, setPhotos] = useState<(File | null | undefined)[]>([]);
//   const [logo, setLogo] = useState<File | null | undefined>(null);
//   const [tag, setTag] = useState<File | null | undefined>(null);

//   const funFacts: string[] = [
//     "I love listening to amapiano while making crochets",
//     "I enjoy working at night when there is more inspiration",
//   ];

//   const price = 12000;
//   const sizes = ["large", "small"];
//   const colors = ["green", "red"];
//   const nationwideDelivery = false;

//   const formData = new FormData();

//   formData.append("title", "Bikini short update");
//   formData.append("availability", "available");
//   formData.append("price", price.toString());
//   formData.append("description", "This is a bikin top");
//   formData.append("gender", "female");
//   formData.append("tag", "bikini");
//   formData.append("nationwideDelivery", nationwideDelivery.toString());
//   sizes.forEach((size) => {
//     formData.append("sizes", size);
//   });
//   colors.forEach((color) => {
//     formData.append("colors", color);
//   });
//   photos.forEach((photo) => {
//     if (photo) formData.append("product-photos", photo);
//   });

//   const { isError, isPending, isSuccess, createProduct, data, error } =
//     useCreateProduct(formData);

//   let errorResponse: any;

//   if (error) errorResponse = error;

//   const {
//     data: products,
//     isError: pError,
//     isLoading: pLoading,
//     isSuccess: pSuccess,
//   } = useGetAllProducts();

//   const { data: product, error: prError } = useGetProductById(
//     "65c26b0c85fbd2c50ca29318"
//   );

//   const {
//     data: myProducts,
//     isLoading,
//     isError: myIsError,
//     error: myError,
//   } = useGetMyProducts();

//   const { data: orders } = useGetCreativeOrders("pending");

//   const {
//     data: years,
//     isPending: updatingYears,
//     updateYearsOfExperience,
//     isError: yearsError,
//   } = useUpdateYearsOfExperience(5);

//   const {
//     data: facts,
//     updateFunFacts,
//     isError: factsError,
//     isPending: factsPending,
//   } = useUpdateFunFacts(funFacts);

//   const {
//     data: personalDescription,
//     isPending: pdPending,
//     isError: pdIsError,
//     error: pdError,
//     updatePersonalDescription,
//   } = useUpdatePersonalDescription(
//     "I am an amazing crochet vendor with massive creativity."
//   );

//   const {
//     data: brandName,
//     isPending: bnPending,
//     isError: bnIsError,
//     error: bnError,
//     setBrandName,
//   } = useSetBrandName("Layomi Appareal");

//   const logoData = new FormData();

//   if (logo) logoData.append("logo", logo);

//   const {
//     data: brandLogo,
//     isPending: blPending,
//     error: blError,
//     setBrandLogo,
//   } = useSetBrandLogo(logoData);

//   const {
//     data: updatedProduct,
//     error: updateError,
//     updateProduct,
//   } = useUpdateProduct(formData, "65c1e5fc48118bd7f496b0c5");

//   const { data: creative } = useGetCreativeById("65c1e36573fe216ae67a1573");

//   const {
//     data: deletedP,
//     error: delError,
//     deleteProduct,
//   } = useDeleteProduct("65c1e5fc48118bd7f496b0c5");

//   const {
//     data: cartItems,
//     error: cartItemsError,
//     isLoading: cartItemsLoading,
//   } = useGetCartItems("65c1e36573fe216ae67a1573");

//   const { data: customerOrder, error: coError } =
//     useGetCustomerOrders("pending");

//   const { data: carts, error: cartsError } = useGetCarts();

//   const { data: wishlists, error: wishlistsError } = useGetWishlists();

//   const { data: creativeProducts, error: creativePErrors } =
//     useGetCreativeAllProducts("65c1e36573fe216ae67a1573");

//   const {
//     data: placeorderres,
//     isPending: placingorder,
//     error: placeordererror,
//     placeAnOrder,
//   } = usePlaceAnOrder("65c1e36573fe216ae67a1573");

//   const {
//     addToCart,
//     data: addCartRes,
//     error: addToCartError,
//   } = useAddToCart("65c26b0c85fbd2c50ca29318");

//   const {
//     removeFromCart,
//     data: removeFromCartRes,
//     error: removeFromCartError,
//   } = useRemoveFromCart("65c26b0c85fbd2c50ca29318");

//   const {
//     data: count,
//     error: countError,
//     updateCartItemCount,
//   } = useUpdateCartItemCount(
//     "65c26b0c85fbd2c50ca29318",
//     5,
//     "65c1e36573fe216ae67a1573"
//   );

//   const {
//     data: wishlist,
//     error: wishlisterror,
//     addAndRemoveWishlist,
//   } = useAddAndRemoveWishlist("65c26b0c85fbd2c50ca29318");

//   const {
//     data: cancelorderres,
//     error: cancelordererror,
//     cancelOrder,
//   } = useCancelAnOrder("65c212cc06028eb6f6c4eb98");

//   const {
//     data: confirmorderres,
//     error: confirmordererror,
//     confirmOrder,
//   } = useConfirmAnOrder("65c212cc06028eb6f6c4eb98");

//   const {
//     deleteCart,
//     data: deletecartres,
//     error: deletecarterror,
//   } = useDeleteCart("65c1e36573fe216ae67a1573");

//   const {
//     data: deleteNRes,
//     deleteNotification,
//     isError: delNIsError,
//     isPending: delNLoading,
//     error: delNError,
//   } = useDeleteNotification("");

//   const formD = new FormData();

//   formD.append("label", "Beenieee");
//   if (tag) formD.append("tag-icon", tag);

//   const {
//     addNewTag,
//     data: addTagData,
//     isPending: addTagPending,
//     error: addTagError,
//   } = useAddNewTag(formD);

//   const {
//     data: allTags,
//     isLoading: tagsLoading,
//     error: tagsError,
//   } = useGetAllTags();

//   const {
//     updateTag,
//     data: updatedTag,
//     error: updatedTagError,
//   } = useUpdateTag("65c9d55240347b054000c309", formD);

//   const {
//     sendEmailVerificationToken,
//     data: emailV,
//     error: emailVError,
//   } = useSendEmailVerificationToken("");

//   const {
//     sendForgotPasswordToken,
//     data: forgorPasswordD,
//     error: forgorPasswordE,
//   } = useSendForgotPasswordToken("");

//   const oldPassword = "";
//   const newPassword = "";

//   const {
//     updatePassword,
//     data: updatePasswordD,
//     error: updatePasswordE,
//   } = useUpdatePassword({ oldPassword, newPassword });

//   const {
//     data: newUser,
//     error: newUserError,
//     signup,
//   } = useSignup({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     role: "customer",
//   });

//   // const options = {
//   //   enableHighAccuracy: true,
//   //   timeout: 5000,
//   //   maximumAge: 0,
//   // };

//   // const [lat, setLat] = useState(0);
//   // const [lng, setLng] = useState(0);

//   // navigator.geolocation.getCurrentPosition(
//   //   (pos) => {
//   //     setLat(pos.coords.latitude);
//   //     setLng(pos.coords.longitude);
//   //     // console.log(pos.coords.latitude);
//   //     // console.log(pos.coords.longitude);
//   //     // console.log(pos.coords.accuracy);
//   //   },

//   //   (err) => {
//   //     console.log(err.message, err.code);
//   //   },

//   //   options
//   // );

//   // const initMap = () => {
//   //   const map = new google.maps.Map(
//   //     document.getElementById("div") as HTMLElement,
//   //     {
//   //       zoom: 8,
//   //       center: { lat, lng },
//   //     }
//   //   );
//   // };

//   // const latlng = { lat, lng };

//   // useEffect(() => {
//   //   initMap();

//   //   const geocoder = new google.maps.Geocoder();

//   //   geocoder.geocode({ location: latlng }, (response) => {
//   //     if (response[0]) {
//   //       console.log(response[0].formatted_address);
//   //     }
//   //   });
//   // }, []);

//   const [err, setErr] = useState("");

//   const signin = async () => {
//     const res = await signIn("credentials", {
//       email: "",
//       password: "",
//       redirect: false,
//     });

//     if (res?.error) {
//       setErr(res.error);
//     }
//   };

//   return (
//     <div>
//       Home
//       <div className="relative h-20 w-20">\</div>
//       <div className="flex flex-col gap-4 ">
//         <input
//           type="file"
//           multiple
//           name="photos"
//           onChange={(e) => {
//             const files = e.target.files;
//             if (files) {
//               setPhotos((prev) => [...prev, ...Array.from(files)]);
//             }
//           }}
//         />

//         <input
//           type="file"
//           name="logo"
//           onChange={(e) => setLogo(e.target.files?.item(0))}
//         />

//         <input
//           type="file"
//           name="tag"
//           onChange={(e) => setTag(e.target.files?.item(0))}
//         />

//         <button type="button" onClick={signin}>
//           Sign In
//         </button>

//         <button type="button" onClick={() => signOut()}>
//           sign out
//         </button>

//         <button type="button" onClick={signup}>
//           sign up
//         </button>

//         <button type="button" onClick={updateProduct}>
//           Update Product
//         </button>

//         <button type="button" onClick={createProduct}>
//           Create Product
//         </button>

//         <button type="button" onClick={deleteProduct}>
//           Delete Product
//         </button>

//         <button type="button" onClick={updateYearsOfExperience}>
//           Update years of experience
//         </button>

//         <button type="button" onClick={updateFunFacts}>
//           Update fun facts
//         </button>

//         <button type="button" onClick={updatePersonalDescription}>
//           Update Personal Description
//         </button>

//         <button type="button" onClick={setBrandName}>
//           Set brand name
//         </button>

//         <button type="button" onClick={setBrandLogo}>
//           Set brand logo
//         </button>

//         <button type="button" onClick={placeAnOrder}>
//           Place an order
//         </button>

//         <button type="button" onClick={addToCart}>
//           Add to cart
//         </button>

//         <button type="button" onClick={removeFromCart}>
//           Remove from cart
//         </button>

//         <button type="button" onClick={updateCartItemCount}>
//           Update cart item count
//         </button>

//         <button type="button" onClick={addAndRemoveWishlist}>
//           Add and remove wishlist
//         </button>

//         <button type="button" onClick={cancelOrder}>
//           cancel order
//         </button>

//         <button type="button" onClick={confirmOrder}>
//           confirm order
//         </button>

//         <button type="button" onClick={deleteCart}>
//           delete cart
//         </button>

//         <button type="button" onClick={addNewTag}>
//           Add tag
//         </button>

//         <button type="button" onClick={updateTag}>
//           update tag
//         </button>

//         <button type="button" onClick={sendEmailVerificationToken}>
//           send email Verification Token
//         </button>

//         <button type="button" onClick={sendForgotPasswordToken}>
//           send forgot password token
//         </button>

//         <button type="button" onClick={updatePassword}>
//           update password
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ApiTesting;
