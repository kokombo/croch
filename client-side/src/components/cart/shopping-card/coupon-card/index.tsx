import { Formik, Form } from "formik";
import { CustomButton } from "@/components/buttons";
import RingsLoader from "@/components/loaders/rings";
import TextField from "@/components/input-fields/text-field";

type Props = {
  pageIsLoading?: boolean;
};

const CouponCard = (props: Props) => {
  return (
    <div className="white_card">
      {props.pageIsLoading ? (
        <div className="flex_item_justify_center h-36">
          <RingsLoader />
        </div>
      ) : (
        <Formik initialValues={{ coupon: "" }} onSubmit={() => {}}>
          <Form className="flex_col_center gap-6">
            <TextField
              name="coupon"
              type="text"
              id="coupon"
              placeholder="Enter a valid coupon code"
            />

            <CustomButton
              type="submit"
              onClick={() => {}}
              label="Apply coupon"
              extraClasses="text-white bg-customblack px-6 py-4"
            />
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default CouponCard;
