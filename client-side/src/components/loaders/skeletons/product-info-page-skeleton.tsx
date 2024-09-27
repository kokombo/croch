import Skeleton from "./skeleton";

const ProductInfoPageSkeleton = () => {
  return (
    <section className="flex flex-col gap-4 py-5 paddingX ">
      <span className="h-8 block">
        <Skeleton className="full width-45" />
      </span>

      <div className="grid grid-rows-2 lg:grid-rows-none grid-cols-none lg:grid-cols-2 gap-3">
        <div className="relative w-full bg-grey h-[356px] lg:h-[428px] rounded-t-xl lg:rounded-tr-none lg:rounded-l-[20px]">
          <Skeleton className="width-100" />
        </div>

        <div className="grid grid-rows-2 gap-2">
          <div className="grid grid-cols-2 gap-2">
            <span className="relative w-full bg-grey">
              <Skeleton className=" width-100" />
            </span>

            <span className="relative w-full bg-grey lg:rounded-tr-[20px]">
              <Skeleton className=" width-100" />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <span className="relative w-full bg-grey rounded-bl-xl lg:rounded-bl-none ">
              <Skeleton className="width-100" />
            </span>

            <span className="relative w-full bg-grey rounded-br-xl lg:rounded-br-[20px]">
              <Skeleton className=" width-100" />
            </span>
          </div>
        </div>
      </div>

      <div>
        <span className="h-8 block">
          <Skeleton className="full width-25" />
        </span>

        <span className="h-8 block mt-2">
          <Skeleton className="full width-45" />
        </span>
      </div>
    </section>
  );
};

export default ProductInfoPageSkeleton;
