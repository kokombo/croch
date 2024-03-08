import { ProductCard } from "..";

type Props = {
  products: Partial<Product[]>;
};

const ProductsList = () => {
  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-10">
      {[...Array(24)].map((_, index) => {
        return <ProductCard key={index} title="Hand Woven Top" price={4000} />;
      })}
    </div>
  );
};

export default ProductsList;
