import { useState } from "react";
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
} from "@/utilities/testing-api-interactions";

const ApiTesting = () => {
  const [photos, setPhotos] = useState<(File | null | undefined)[]>([]);
  const [logo, setLogo] = useState<File | null | undefined>(null);

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
    "65c1e5fc48118bd7f496b0c5"
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

  return (
    <div>
      Home
      <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
};

export default ApiTesting;
