type Props = {
  product: Product;
};
const AvailabilityAndGenderBox = (props: Props) => {
  return (
    <span className="flex gap-3">
      <h6 className="text-sm">
        Availability:{" "}
        <span className="text-lightgreen font-semibold capitalize">
          {props.product.availability}
        </span>
      </h6>

      <h6 className="text-sm">
        Gender:{" "}
        <span className="text-skyblue font-semibold capitalize">
          {props.product.gender}
        </span>
      </h6>
    </span>
  );
};

export default AvailabilityAndGenderBox;
