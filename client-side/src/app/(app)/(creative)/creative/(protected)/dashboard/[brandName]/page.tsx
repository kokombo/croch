"use client";

import { useState } from "react";
import { useCreateProduct } from "@/utilities/api-interactions/product";
import { OverlayLoader } from "@/components";

const Dashboard = () => {
  const [photos, setPhotos] = useState<(File | null | undefined)[]>([]);

  const price = 8000;
  const sizes = ["large", "extraLarge", "small"];
  const colors = ["green", "red"];
  const nationwideDelivery = true;

  const formData = new FormData();

  formData.append("title", "Enchanted Garden Crochet Shawl");
  formData.append("availability", "pre-order");
  formData.append("price", price.toString());
  formData.append(
    "description",
    "Step into a world of whimsy and elegance with our Enchanted Garden Crochet Shawl. Delicately woven with intricate floral patterns, this shawl captures the essence of a magical garden in full bloom. Made from luxurious yarn, it's lightweight yet warm, perfect for adding a touch of enchantment to any outfit. Whether you're strolling through the park or attending a special event, this shawl will be your stylish companion. Embrace nature's beauty with every wear and let the enchantment of the garden wrap around you in cozy comfort."
  );
  formData.append("gender", "male");
  formData.append("tag", "top");
  formData.append("nationwideDelivery", nationwideDelivery.toString());
  formData.append(
    "primaryLocation",
    JSON.stringify({ name: "Ibadan", minDeliveryDays: 1, maxDeliveryDays: 3 })
  );
  formData.append(
    "otherLocations",
    JSON.stringify({ minDeliveryDays: 5, maxDeliveryDays: 7 })
  );
  for (const size of sizes) {
    formData.append("sizes", size);
  }
  for (const color of colors) {
    formData.append("colors", color);
  }
  for (const photo of photos) {
    if (photo) formData.append("product-photos", photo);
  }

  //instead of the entire above. use Object.entries(fields).forEach(([key, value])=>{formData.append(key, value as strin)})

  const { isError, isPending, isSuccess, createProduct, data, error } =
    useCreateProduct(formData);

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
