"use client";

import { useState } from "react";
import { useCreateProduct } from "@/utilities/api-interactions/product";

const Dashboard = () => {
  const [photos, setPhotos] = useState<(File | null | undefined)[]>([]);

  const price = 12000;
  const sizes = ["large", "small"];
  const colors = ["green", "red"];
  const nationwideDelivery = true;

  const formData = new FormData();

  formData.append(
    "title",
    "Boho Bliss Crochet Top: Handcrafted Chic for Every Occasion"
  );
  formData.append("availability", "pre-order");
  formData.append("price", price.toString());
  formData.append(
    "description",
    "Introducing our stunning Crochet Boho Top, a perfect blend of elegance and bohemian flair. Handcrafted with meticulous attention to detail, this top is a true masterpiece of crochet artistry.Made from soft and breathable cotton yarn, this top ensures comfort and style, making it ideal for warm summer days or layering in cooler seasons. The intricate crochet patterns create a beautiful texture that adds depth and dimension to your outfit. The Boho Top features a flattering V-neckline and relaxed fit, offering a breezy and effortless silhouette. Pair it with your favorite jeans or shorts for a casual chic look, or dress it up with a skirt and accessories for a bohemian-inspired ensemble.Available in a range of sizes and versatile colors, our Crochet Boho Top is a must-have addition to your wardrobe. Embrace the beauty of handmade craftsmanship and elevate your style with this timeless and unique piece."
  );
  formData.append("gender", "female");
  formData.append("tag", "top");
  formData.append("nationwideDelivery", nationwideDelivery.toString());
  formData.append(
    "primaryLocation",
    JSON.stringify({ name: "Lagos", minDeliveryDays: 2, maxDeliveryDays: 5 })
  );
  formData.append(
    "otherLocations",
    JSON.stringify({ minDeliveryDays: 3, maxDeliveryDays: 7 })
  );
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
    useCreateProduct(formData);

  console.log(data);

  return (
    <div>
      Dashboard
      <span>
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
      </span>
      <button type="button" onClick={createProduct}>
        Create Product
      </button>
      <span>
        {isPending && <p>Loading...</p>}
        <p>{error?.response?.data.message} </p>
      </span>
    </div>
  );
};

export default Dashboard;
