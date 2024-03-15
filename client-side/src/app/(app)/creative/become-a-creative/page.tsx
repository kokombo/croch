"use client";

import {
  AccountSetupStep,
  AccountSetupStepInfo,
  CustomButton,
  Logo,
  NavAccount,
  TextArea,
  TextField,
  UploadLogo,
} from "@/components";
import {
  useAccountSetupDone,
  useSetupCreativeAccount,
} from "@/utilities/api-interactions/creative";
import { Formik, Form, FormikHelpers } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { creativeAccountSetupValidationSchema } from "@/utilities/validation/form-validations";
useAccountSetupDone;

const initialFormValues: CreativeAccountSetupData = {
  brandName: "",
  logo: "",
  personalDescription: "",
  funFacts: [],
  yearsOfExperience: "",
};

const CreativeAccountSetup = () => {
  const [step, setStep] = useState(1);

  const router = useRouter();

  const { mutateAsync, isError, isPending, isSuccess, error } =
    useSetupCreativeAccount();

  const { confirmAccountSetup } = useAccountSetupDone();

  const finishAccountSetup = async (
    values: CreativeAccountSetupData,
    onsubmitProps: FormikHelpers<CreativeAccountSetupData>
  ) => {
    const formData = new FormData();

    formData.append("logo", values.logo);
    formData.append("brandName", values.brandName);
    values.funFacts.forEach((funFact) => {
      formData.append("funFacts", funFact);
    });
    formData.append("personalDescription", values.personalDescription);
    formData.append("yearsOfExperience", values.yearsOfExperience);

    await mutateAsync(formData, {
      onSuccess: () => {
        confirmAccountSetup();
        onsubmitProps.resetForm();
        router.push("/creative/dashboard");
      },
    });
  };

  return (
    <div>
      <nav className="flex items-center justify-between py-[18px] px-[4.6%] border-b-[1px] border-grey">
        <Logo />

        <NavAccount onClick={() => {}} opened={false} />
      </nav>

      <section className="flex items-center justify-between px-[4.6%] border-b-[1px] border-grey h-40">
        <span className="flex flex-col gap-2">
          <p className="text-3xl font-bold">Set Up Your Account</p>

          <p>Complete your account setup in just 3 steps</p>
        </span>

        <div className="flex items-center gap-2">
          <AccountSetupStep label="Step 1" active={step === 1} />

          <AccountSetupStep label="Step 2" active={step === 2} />

          <AccountSetupStep label="Step 3" active={step === 3} />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-[10%] px-[4.6%] py-24 ">
        <div>
          {step === 1 && (
            <AccountSetupStepInfo
              label="Step 1"
              title="Give us a few details about you and your brand"
              description="Lorem ipsum dolor sit amet consectetur. Bibendum dignissim molestie vehicula et convallis massa enim porttitor. Odio pellentesque hac velit eget orci porttitor sed porta.  sit "
            />
          )}

          {step === 2 && (
            <AccountSetupStepInfo
              label="Step 2"
              title="More details about your brand"
              description="Lorem ipsum dolor sit amet consectetur. Bibendum dignissim molestie vehicula et convallis massa enim porttitor. Odio pellentesque hac velit eget orci porttitor sed porta.  sit "
            />
          )}

          {step === 3 && (
            <AccountSetupStepInfo
              label="Step 3"
              title="You’re almost ready to go, just a few more details "
              description="Lorem ipsum dolor sit amet consectetur. Bibendum dignissim molestie vehicula et convallis massa enim porttitor. Odio pellentesque hac velit eget orci porttitor sed porta.  sit "
            />
          )}
        </div>

        <Formik
          initialValues={initialFormValues}
          onSubmit={finishAccountSetup}
          validationSchema={creativeAccountSetupValidationSchema}
          validateOnBlur
          validateOnChange
        >
          {(formik) => {
            return (
              <Form>
                {step === 1 && (
                  <div className="flex flex-col gap-8">
                    <TextField
                      type="text"
                      id="brandName"
                      name="brandName"
                      placeholder="Brand name"
                    />

                    <TextArea
                      name="personalDescription"
                      id="personalDescription"
                      placeholder="Tell us about you and your brand"
                      extraClasses=" h-[296px]"
                    />

                    <span className="flex self-end">
                      <CustomButton
                        label="Next"
                        type="button"
                        onClick={() => setStep(2)}
                        extraClasses="bg-black text-white px-10 py-4 "
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

                {step === 2 && (
                  <div className="flex flex-col gap-8">
                    <TextField
                      type="number"
                      name="yearsOfExperience"
                      id="yearsOfExperience"
                      placeholder="How long have you been doing this in years? e.g. 2."
                    />

                    <TextArea
                      id="funFacts"
                      name="funFacts[0]"
                      placeholder="Tell us a fun fact about how you make your products. e.g. I draw inspiration from listening to afrobeat while crocheting."
                      extraClasses=""
                    />

                    {formik.values.funFacts.length > 0 && (
                      <TextArea
                        id="funFacts"
                        name="funFacts[1]"
                        placeholder="Another fun fact."
                        extraClasses=""
                      />
                    )}

                    {formik.values.funFacts.length > 1 && (
                      <TextArea
                        id="funFacts"
                        name="funFacts[2]"
                        placeholder="And the last fun fact."
                        extraClasses=""
                      />
                    )}

                    <span className="flex gap-10 self-end">
                      <CustomButton
                        label="Previous"
                        type="button"
                        onClick={() => setStep((prev) => prev - 1)}
                        extraClasses="text-black border-black border-[2px] px-10 py-4"
                      />

                      <CustomButton
                        label="Next"
                        type="button"
                        onClick={() => setStep(3)}
                        extraClasses="bg-black text-white  px-10 py-4"
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

                {step === 3 && (
                  <div className="flex flex-col gap-8 items-start">
                    <UploadLogo />

                    <span className="flex gap-10 self-end">
                      <CustomButton
                        label="Previous"
                        type="button"
                        onClick={() => setStep((prev) => prev - 1)}
                        extraClasses="text-black border-black border-[2px]  px-10 py-4"
                      />

                      <CustomButton
                        label="Finish"
                        type="submit"
                        extraClasses="bg-black text-white  px-10 py-4"
                      />
                    </span>

                    <span>
                      {isPending && <p>Loading...</p>}

                      {isSuccess && <p>Success</p>}

                      {isError && <p>{error?.response?.data.message} </p>}
                    </span>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </section>
    </div>
  );
};

export default CreativeAccountSetup;
