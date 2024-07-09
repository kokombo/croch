import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import TextField from "../../input-fields/text-field";
import TextArea from "../../input-fields/text-area";
import CustomButton from "../../buttons/custom-button";
import UploadLogo from "../../input-fields/upload-logo";
import CustomError from "../../custom-error";
import OverlayLoader from "../../loaders/overlay-loader";
import { creativeAccountSetupValidationSchema } from "@/utilities/validation/form-validations";
import type { Dispatch, SetStateAction } from "react";
import type { AxiosError } from "axios";

type Props = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  isError: boolean;
  isPending: boolean;
  error: AxiosError<ErrorResponse> | null;
  finishAccountSetup: (
    values: CreativeAccountSetupData,
    onsubmitProps: FormikHelpers<CreativeAccountSetupData>
  ) => Promise<void>;
};

const initialFormValues: CreativeAccountSetupData = {
  brandName: "",
  logo: "",
  personalDescription: "",
  funFacts: [],
  yearsOfExperience: "",
};

const AccountSetupForm = (props: Props) => {
  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={props.finishAccountSetup}
      validationSchema={creativeAccountSetupValidationSchema}
      validateOnBlur
      validateOnChange
    >
      {(formik) => {
        return (
          <Form>
            {props.step === 1 && (
              <div className="flex flex-col gap-10">
                <TextField
                  type="text"
                  id="brandName"
                  name="brandName"
                  placeholder="Brand name"
                  maxLength={51}
                />

                <TextArea
                  name="personalDescription"
                  id="personalDescription"
                  placeholder="Tell us about you and your brand. Feel free to sell yourself."
                  extraClasses=" h-[296px]"
                  maxLength={501}
                />

                <span className="flex self-end">
                  <CustomButton
                    label="Next"
                    type="button"
                    onClick={() => props.setStep(2)}
                    className="bg-customblack text-white px-10 py-4 "
                    disabled={
                      !formik.values.brandName ||
                      !formik.values.personalDescription ||
                      Boolean(formik.errors.brandName) ||
                      Boolean(formik.errors.personalDescription)
                    }
                  />
                </span>
              </div>
            )}

            {props.step === 2 && (
              <div className="flex flex-col gap-10">
                <TextField
                  type="number"
                  name="yearsOfExperience"
                  id="yearsOfExperience"
                  placeholder="How long have you been doing this in years? e.g. 2."
                  maxLength={2}
                />

                <TextArea
                  id="funFacts"
                  name="funFacts[0]"
                  placeholder="Tell us a fun fact about how you make your products. e.g. I am more inspired when listening to afrobeat while crocheting."
                  extraClasses="h-[100px]"
                  maxLength={151}
                />

                {formik.values.funFacts.length > 0 && (
                  <TextArea
                    id="funFacts"
                    name="funFacts[1]"
                    placeholder="Another fun fact."
                    extraClasses="h-[100px]"
                    maxLength={151}
                  />
                )}

                {formik.values.funFacts.length > 1 && (
                  <TextArea
                    id="funFacts"
                    name="funFacts[2]"
                    placeholder="And the last fun fact."
                    extraClasses="h-[100px]"
                    maxLength={151}
                  />
                )}

                <span className="flex gap-10 self-end">
                  <CustomButton
                    label="Previous"
                    type="button"
                    onClick={() => props.setStep((prev) => prev - 1)}
                    className="text-customblack border-grey border-[1px] px-10 py-4"
                  />

                  <CustomButton
                    label="Next"
                    type="button"
                    onClick={() => props.setStep(3)}
                    className="bg-customblack text-white px-10 py-4"
                    disabled={
                      !formik.values.yearsOfExperience ||
                      !formik.values.funFacts ||
                      Boolean(formik.errors.funFacts) ||
                      Boolean(formik.errors.yearsOfExperience)
                    }
                  />
                </span>
              </div>
            )}

            {props.step === 3 && (
              <div className="flex flex-col gap-10 items-start">
                <UploadLogo />

                <span className="flex gap-10 self-end">
                  <CustomButton
                    label="Previous"
                    type="button"
                    onClick={() => props.setStep((prev) => prev - 1)}
                    className="text-customblack border-black border-[2px]  px-10 py-4"
                  />

                  <CustomButton
                    label="Finish"
                    type="submit"
                    className="bg-customblack text-white  px-10 py-4"
                  />
                </span>

                {props.isError && (
                  <CustomError message={props.error?.response?.data.message} />
                )}

                {props.isPending && <OverlayLoader />}
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default AccountSetupForm;
