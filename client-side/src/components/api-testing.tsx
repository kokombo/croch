import { useEffect, useState } from "react";
import {
  createProductFunction,
  getAllProducts,
  getProductById,
  getMyProducts,
  getCreativeOrders,
  updateYearsOfExperienceFunction,
  updateFunFactsFunction,
  updatePersonalDescriptionFunction,
  setBrandNameFunction,
  setBrandLogoFunction,
  updateProductFunction,
  getCreativeById,
  deleteProductFunction,
  getCartItems,
  getCustomerOrders,
  getCarts,
  getWishlists,
  getCreativeAllProducts,
  placeAnOrderFunction,
  addToCartFunction,
  removeFromCartFunction,
  updateCartItemCountFunction,
  addAndRemoveWishlistFunction,
  cancelAnOrderFunction,
  confirmAnOrderFunction,
  deleteCartFunction,
  deleteNotificationFunction,
  addNewTagFunction,
  getAllTags,
  updateTagFunction,
  sendEmailVerificationTokenFunction,
  sendForgotPasswordTokenFunction,
  updatePasswordFunction,
} from "@/utilities/testing-api-interactions";
import { signIn, signOut } from "next-auth/react";
import { useCurrentUser } from "@/utilities";

const ApiTesting = () => {
  const { accessToken } = useCurrentUser();

  const [photos, setPhotos] = useState<(File | null | undefined)[]>([]);
  const [logo, setLogo] = useState<File | null | undefined>(null);
  const [tag, setTag] = useState<File | null | undefined>(null);

  const funFacts: string[] = [
    "I love listening to amapiano while making crochets",
    "I enjoy working at night when there is more inspiration",
  ];

  const price = 12000;
  const sizes = ["large", "small"];
  const colors = ["green", "red"];
  const nationwideDelivery = false;

  const formData = new FormData();

  formData.append("title", "Bikini short update");
  formData.append("availability", "available");
  formData.append("price", price.toString());
  formData.append("description", "This is a bikin top");
  formData.append("gender", "female");
  formData.append("tag", "bikini");
  formData.append("nationwideDelivery", nationwideDelivery.toString());
  sizes.forEach((size) => {
    formData.append("sizes", size);
  });
  colors.forEach((color) => {
    formData.append("colors", color);
  });
  photos.forEach((photo) => {
    if (photo) formData.append("product-photos", photo);
  });

  const { isError, isPending, isSuccess, createProduct, data, error } =
    createProductFunction(formData);

  let errorResponse: any;

  if (error) errorResponse = error;

  const {
    data: products,
    isError: pError,
    isLoading: pLoading,
    isSuccess: pSuccess,
  } = getAllProducts();

  const { data: product, error: prError } = getProductById(
    "65c26b0c85fbd2c50ca29318"
  );

  const {
    data: myProducts,
    isLoading,
    isError: myIsError,
    error: myError,
  } = getMyProducts();

  const { data: orders } = getCreativeOrders("pending");

  const {
    data: years,
    isPending: updatingYears,
    updateYearsOfExperience,
    isError: yearsError,
  } = updateYearsOfExperienceFunction(5);

  const {
    data: facts,
    updateFunFacts,
    isError: factsError,
    isPending: factsPending,
  } = updateFunFactsFunction(funFacts);

  const {
    data: personalDescription,
    isPending: pdPending,
    isError: pdIsError,
    error: pdError,
    updatePersonalDescription,
  } = updatePersonalDescriptionFunction(
    "I am an amazing crochet vendor with massive creativity."
  );

  const {
    data: brandName,
    isPending: bnPending,
    isError: bnIsError,
    error: bnError,
    setBrandName,
  } = setBrandNameFunction("Layomi Appareal");

  const logoData = new FormData();

  if (logo) logoData.append("logo", logo);

  const {
    data: brandLogo,
    isPending: blPending,
    error: blError,
    setBrandLogo,
  } = setBrandLogoFunction(logoData);

  const {
    data: updatedProduct,
    error: updateError,
    updateProduct,
  } = updateProductFunction(formData, "65c1e5fc48118bd7f496b0c5");

  const { data: creative } = getCreativeById("65c1e36573fe216ae67a1573");

  const {
    data: deletedP,
    error: delError,
    deleteProduct,
  } = deleteProductFunction("65c1e5fc48118bd7f496b0c5");

  const {
    data: cartItems,
    error: cartItemsError,
    isLoading: cartItemsLoading,
  } = getCartItems("65c1e36573fe216ae67a1573");

  const { data: customerOrder, error: coError } = getCustomerOrders("pending");

  const { data: carts, error: cartsError } = getCarts();

  const { data: wishlists, error: wishlistsError } = getWishlists();

  const { data: creativeProducts, error: creativePErrors } =
    getCreativeAllProducts("65c1e36573fe216ae67a1573");

  const {
    data: placeorderres,
    isPending: placingorder,
    error: placeordererror,
    placeAnOrder,
  } = placeAnOrderFunction("65c1e36573fe216ae67a1573");

  const {
    addToCart,
    data: addCartRes,
    error: addToCartError,
  } = addToCartFunction("65c26b0c85fbd2c50ca29318");

  const {
    removeFromCart,
    data: removeFromCartRes,
    error: removeFromCartError,
  } = removeFromCartFunction("65c26b0c85fbd2c50ca29318");

  const {
    data: count,
    error: countError,
    updateCartItemCount,
  } = updateCartItemCountFunction(
    "65c26b0c85fbd2c50ca29318",
    5,
    "65c1e36573fe216ae67a1573"
  );

  const {
    data: wishlist,
    error: wishlisterror,
    addAndRemoveWishlist,
  } = addAndRemoveWishlistFunction("65c26b0c85fbd2c50ca29318");

  const {
    data: cancelorderres,
    error: cancelordererror,
    cancelOrder,
  } = cancelAnOrderFunction("65c212cc06028eb6f6c4eb98");

  const {
    data: confirmorderres,
    error: confirmordererror,
    confirmOrder,
  } = confirmAnOrderFunction("65c212cc06028eb6f6c4eb98");

  const {
    deleteCart,
    data: deletecartres,
    error: deletecarterror,
  } = deleteCartFunction("65c1e36573fe216ae67a1573");

  const {
    data: deleteNRes,
    deleteNotification,
    isError: delNIsError,
    isPending: delNLoading,
    error: delNError,
  } = deleteNotificationFunction("");

  const formD = new FormData();

  formD.append("label", "Beenieee");
  if (tag) formD.append("tag-icon", tag);

  const {
    addNewTag,
    data: addTagData,
    isPending: addTagPending,
    error: addTagError,
  } = addNewTagFunction(formD);

  const {
    data: allTags,
    isLoading: tagsLoading,
    error: tagsError,
  } = getAllTags();

  const {
    updateTag,
    data: updatedTag,
    error: updatedTagError,
  } = updateTagFunction("65c9d55240347b054000c309", formD);

  const {
    sendEmailVerificationToken,
    data: emailV,
    error: emailVError,
  } = sendEmailVerificationTokenFunction("");

  const {
    sendForgotPasswordToken,
    data: forgorPasswordD,
    error: forgorPasswordE,
  } = sendForgotPasswordTokenFunction("");

  const oldPassword = "";
  const newPassword = "";

  const {
    updatePassword,
    data: updatePasswordD,
    error: updatePasswordE,
  } = updatePasswordFunction({ oldPassword, newPassword });

  // const options = {
  //   enableHighAccuracy: true,
  //   timeout: 5000,
  //   maximumAge: 0,
  // };

  // const [lat, setLat] = useState(0);
  // const [lng, setLng] = useState(0);

  // navigator.geolocation.getCurrentPosition(
  //   (pos) => {
  //     setLat(pos.coords.latitude);
  //     setLng(pos.coords.longitude);
  //     // console.log(pos.coords.latitude);
  //     // console.log(pos.coords.longitude);
  //     // console.log(pos.coords.accuracy);
  //   },

  //   (err) => {
  //     console.log(err.message, err.code);
  //   },

  //   options
  // );

  // const initMap = () => {
  //   const map = new google.maps.Map(
  //     document.getElementById("div") as HTMLElement,
  //     {
  //       zoom: 8,
  //       center: { lat, lng },
  //     }
  //   );
  // };

  // const latlng = { lat, lng };

  // useEffect(() => {
  //   initMap();

  //   const geocoder = new google.maps.Geocoder();

  //   geocoder.geocode({ location: latlng }, (response) => {
  //     if (response[0]) {
  //       console.log(response[0].formatted_address);
  //     }
  //   });
  // }, []);

  const signin = async () => {
    await signIn("credentials", {
      email: "",
      password: "",
      redirect: false,
    });
  };

  return (
    <div>
      Home
      <div className="relative h-20 w-20">\</div>
      <div className="flex flex-col gap-4 ">
        <input
          type="file"
          multiple
          name="photos"
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setPhotos((prev) => [...prev, ...Array.from(files)]);
            }
          }}
        />

        <input
          type="file"
          name="logo"
          onChange={(e) => setLogo(e.target.files?.item(0))}
        />

        <input
          type="file"
          name="tag"
          onChange={(e) => setTag(e.target.files?.item(0))}
        />

        <button type="button" onClick={signin}>
          Sign In
        </button>

        <button type="button" onClick={() => signOut()}>
          sign out
        </button>

        <button type="button" onClick={updateProduct}>
          Update Product
        </button>

        <button type="button" onClick={createProduct}>
          Create Product
        </button>

        <button type="button" onClick={deleteProduct}>
          Delete Product
        </button>

        <button type="button" onClick={updateYearsOfExperience}>
          Update years of experience
        </button>

        <button type="button" onClick={updateFunFacts}>
          Update fun facts
        </button>

        <button type="button" onClick={updatePersonalDescription}>
          Update Personal Description
        </button>

        <button type="button" onClick={setBrandName}>
          Set brand name
        </button>

        <button type="button" onClick={setBrandLogo}>
          Set brand logo
        </button>

        <button type="button" onClick={placeAnOrder}>
          Place an order
        </button>

        <button type="button" onClick={addToCart}>
          Add to cart
        </button>

        <button type="button" onClick={removeFromCart}>
          Remove from cart
        </button>

        <button type="button" onClick={updateCartItemCount}>
          Update cart item count
        </button>

        <button type="button" onClick={addAndRemoveWishlist}>
          Add and remove wishlist
        </button>

        <button type="button" onClick={cancelOrder}>
          cancel order
        </button>

        <button type="button" onClick={confirmOrder}>
          confirm order
        </button>

        <button type="button" onClick={deleteCart}>
          delete cart
        </button>

        <button type="button" onClick={addNewTag}>
          Add tag
        </button>

        <button type="button" onClick={updateTag}>
          update tag
        </button>

        <button type="button" onClick={sendEmailVerificationToken}>
          send email Verification Token
        </button>

        <button type="button" onClick={sendForgotPasswordToken}>
          send forgot password token
        </button>

        <button type="button" onClick={updatePassword}>
          update password
        </button>
      </div>
    </div>
  );
};

export default ApiTesting;
