import { useState } from "react";
import { Slider, UnclickableRating } from "..";

const ProductCard = (props: Partial<Product>) => {
  const [hideButton, setHideButton] = useState(true);

  return (
    <div
      onPointerEnter={() => setHideButton(false)}
      onPointerLeave={() => setHideButton(true)}
      className="w-full flex flex-col gap-3"
    >
      <Slider
        hideButton={hideButton}
        sliderData={[
          "/product1.png",
          "/sp.png",
          "/cp.png",
          "/sp.png",
          "/cp.png",
          "/sp.png",
          "/cp.png",
          "/sp.png",
          "/cp.png",
          "/sp.png",
          "/cp.png",
        ]}
      />

      <div className="flex flex-col gap-2">
        <UnclickableRating />

        <h1>{props.title}</h1>

        <h2 className="text-xl leading-6 font-[900]">#{props.price}</h2>
      </div>
    </div>
  );
};

export default ProductCard;
