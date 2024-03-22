import { Formik, Form } from "formik";
import { CustomButton, TextField } from "../..";

const CouponCard = () => {
  return (
    <div className="mt-2 white_card">
      <Formik initialValues={{ coupon: "" }} onSubmit={() => {}}>
        <Form className="flex flex-col items-center gap-6">
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
    </div>
  );
};

export default CouponCard;
