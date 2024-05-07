import Divider from "@/components/divider";
import { CreativeInfo } from "@/components/product-details-page";
import { H4, H6 } from "@/components/texts";

type Props = {
  creative: Creative | undefined;
  order: Order | undefined;
};

const OrderCustomerSummary = (props: Props) => {
  return (
    <div>
      <H4>Customer Summary</H4>

      <Divider />

      {props.creative && <CreativeInfo creative={props.creative} />}

      <H6>Total Items: {props.order?.items.length} </H6>
    </div>
  );
};

export default OrderCustomerSummary;
