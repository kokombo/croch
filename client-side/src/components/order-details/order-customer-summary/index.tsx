import Divider from "@/components/divider";
import { UnclickableRating } from "@/components/product";
import { H4, H5, H6 } from "@/components/texts";
import commaNumber from "comma-number";
import Image from "next/image";
import { Fragment } from "react";

type Props = {
  creative: Creative | undefined;
  order: Order | undefined;
};

const OrderCustomerSummary = (props: Props) => {
  return (
    <div className="border_grey_1 rounded-xl py-6 px-5 flex_col gap-7">
      <div className="flex_col gap-3">
        <H4>Summary</H4>

        <Divider />
      </div>

      <Fragment>
        {props.creative && (
          <article className="flex items-center gap-2 h-[100px] border_grey_1 p-4 rounded-xl bg-gray">
            <div className="relative h-10 w-10 bg-grey rounded-full">
              <Image
                src={props.creative.brandLogo}
                alt=""
                fill
                quality={100}
                className="rounded-full"
              />
            </div>

            <article>
              <H5>{props.creative?.brandName} </H5>

              <UnclickableRating rating={props.creative.rating} />
            </article>
          </article>
        )}
      </Fragment>

      <Fragment>
        {props.order && (
          <div className="flex flex-col gap-5">
            <H6>Total Items: {props.order?.items.length} </H6>

            <span className={classA}>
              <h5>Delivery Address</h5>

              <h6>Nil</h6>
            </span>

            <span className={classA}>
              <h5>Phone Number</h5>

              <h6>Nil</h6>
            </span>

            <span className={classA}>
              <h5>Promotional Code</h5>

              <h6>Nil</h6>
            </span>

            <span className={classA}>
              <h5>Date and Time</h5>

              <h6>Nil</h6>
            </span>

            <span className="flex_item_justify_between">
              <H4>Total Cost</H4>

              <H4> &#8358;{commaNumber(props.order?.totalPrice)}</H4>
            </span>
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default OrderCustomerSummary;

const classA = "flex flex-col text-sm font-medium gap-3";
