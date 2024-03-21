type Props = {
  product: Product;
};

const DeliveryTime = (props: Props) => {
  return (
    <article className="text-sm">
      <span className="font-semibold">Note:</span> Delivery within the same
      location usually take{" "}
      <span className="font-bold">
        {props.product.primaryLocation?.minDeliveryDays}-
        {props.product.primaryLocation?.maxDeliveryDays}days
      </span>{" "}
      after purchase{" "}
      <span>
        {props.product.nationwideDelivery && (
          <span>
            while delivery outside primary location will take
            <span className="font-bold">
              {" "}
              {props.product.otherLocations?.minDeliveryDays}-
              {props.product.otherLocations?.maxDeliveryDays}days{" "}
            </span>
            after purchase
          </span>
        )}{" "}
      </span>
    </article>
  );
};

export default DeliveryTime;
