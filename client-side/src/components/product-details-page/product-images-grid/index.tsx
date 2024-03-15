import Image from "next/image";

const ProductImagesGrid = ({ photos }: { photos: string[] }) => {
  return (
    <div className="grid grid-cols-2 h-[428px] gap-3">
      <div className="relative w-full bg-grey rounded-l-[20px]">
        <Image
          src={photos[0]}
          alt=""
          fill
          loading="lazy"
          quality={100}
          sizes="any"
          className="rounded-l-[20px] object-cover hover:brightness-90"
        />
      </div>

      <div className="grid grid-rows-2 gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="relative w-full bg-grey">
            <Image
              src={photos[1]}
              alt=""
              fill
              loading="lazy"
              quality={100}
              sizes="any"
              className="object-cover hover:brightness-90"
            />
          </div>

          <div className="relative w-full bg-grey rounded-r-[20px]">
            <Image
              src={photos[2]}
              alt=""
              fill
              loading="lazy"
              quality={100}
              sizes="any"
              className="rounded-tr-[20px] object-cover hover:brightness-90"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="relative w-full bg-grey">
            <Image
              src={photos[3]}
              alt=""
              fill
              loading="lazy"
              quality={100}
              sizes="any"
              className="object-cover hover:brightness-90"
            />
          </div>

          <div className="relative w-full bg-grey rounded-r-[20px]">
            <Image
              src={photos[4]}
              alt=""
              fill
              loading="lazy"
              quality={100}
              sizes="any"
              className="rounded-br-[20px] object-cover hover:brightness-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImagesGrid;
