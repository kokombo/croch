import { H3, Divider, CustomButton, H6, CheckOutLabel } from "../..";
import commaNumber from "comma-number";

type Props = {
  cart: Cart;
};

const CheckOutCard = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <H3>Card Totals</H3>

      <span className="flex flex-col gap-3">
        <SpanItem
          label="Sub-total"
          value={`\u20A6${commaNumber(props.cart?.totalPrice)}`}
        />
        <SpanItem label="Shipping" value="Free" />

        <SpanItem label="Discount" value="Nil" />

        <SpanItem label="VAT" value="Nil" />
      </span>

      <Divider />

      <SpanItem
        label="Total"
        value={`\u20A6${commaNumber(props.cart.totalPrice)}`}
      />

      <CustomButton
        type="button"
        onClick={() => {}}
        label="Proceed to check out"
        extraClasses="text-white bg-customblack p-4 w-full"
      />

      <CheckOutLabel />
    </div>
  );
};

export default CheckOutCard;

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
