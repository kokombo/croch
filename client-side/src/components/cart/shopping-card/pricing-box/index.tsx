import { H6, Divider } from "@/components";

type Props = {
  cart: Cart;
};

const PricingBox = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="flex flex-col gap-3">
        <SpanItem
          label="Sub-total"
          value={`\u20A6${props.cart?.totalPrice.toLocaleString()}`}
        />
        <SpanItem label="Shipping" value="Free" />

        <SpanItem label="Discount" value="Nil" />

        <SpanItem label="VAT" value="Nil" />
      </span>

      <Divider />

      <SpanItem
        label="Total"
        value={`\u20A6${props.cart.totalPrice.toLocaleString()}`}
      />
    </div>
  );
};

export default PricingBox;

const SpanItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <span className="flex items-center justify-between">
      <p className="text-sm text-customblack">{label}</p>

      <H6>{value}</H6>
    </span>
  );
};
