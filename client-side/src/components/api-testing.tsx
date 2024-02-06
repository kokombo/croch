import { useState } from "react";
import {
  createProductFunction,
  getAllProducts,
  getProductById,
  getMyProducts,
  getCreativeOrders,
} from "@/utilities/testing-api-interactions";

const ApiTesting = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const price = 5000;
  const sizes = ["large", "small"];
  const colors = ["green", "red"];
  const nationwideDelivery = false;

  const formData = new FormData();

  formData.append("title", "Gown top");
  formData.append("availability", "pre-oder");
  formData.append("price", price.toString());
  formData.append("description", "This is a bikin top");
  formData.append("gender", "female");
  formData.append("tag", "top");
  formData.append("nationwideDelivery", nationwideDelivery.toString());
  sizes.forEach((size) => {
    formData.append("sizes", size);
  });
  colors.forEach((color) => {
    formData.append("colors", color);
  });
  photos.forEach((photo) => {
    formData.append("product-photos", photo);
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

  return (
    <div>
      Home
      <div>
        <input
          type="file"
          multiple
          name="photos"
          onChange={(e) => setPhotos((prev) => [...prev, e.target.value])}
        />

        <button type="button" onClick={createProduct}>
          Create Product
        </button>
      </div>
    </div>
  );
};

export default ApiTesting;
