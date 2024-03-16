import Image from "next/image";

const Review = () => {
  return (
    <article className="flex flex-col gap-3">
      <span className="flex items-center gap-3 w-fit py-2 px-3 bg-gray rounded-lg">
        <div className="relative rounded-full bg-grey h-10 w-10">
          <Image
            src="/cp.png"
            alt=""
            quality={100}
            fill
            sizes="any"
            className="rounded-full object-cover"
          />
        </div>

        <span>
          <h6 className="text-neutral">Richard Richard</h6>

          <span className="flex gap-2 text-sm font-semibold">
            <h5>5.0*****</h5>

            <h6>2 weeks ago</h6>
          </span>
        </span>
      </span>

      <span className="text-base font-normal">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, Lorem ipsum dolor sit amet, consectetuer
        adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes,
      </span>
    </article>
  );
};

export default Review;
