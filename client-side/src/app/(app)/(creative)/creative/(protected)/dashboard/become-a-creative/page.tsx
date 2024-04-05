"use client";

import {
  AccountSetupStep,
  AccountSetupStepInfo,
  CustomButton,
  CustomError,
  DropDown,
  NavAccount,
  OverlayLoader,
  TextArea,
  TextField,
  UploadLogo,
} from "@/components";
import {
  useAccountSetupDone,
  useGetCreativeById,
  useSetupCreativeAccount,
} from "@/utilities/api-interactions/creative";
import { Formik, Form, FormikHelpers } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { creativeAccountSetupValidationSchema } from "@/utilities/validation/form-validations";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/utilities";

const initialFormValues: CreativeAccountSetupData = {
  brandName: "",
  logo: "",
  personalDescription: "",
  funFacts: [],
  yearsOfExperience: "",
};

const CreativeAccountSetup = () => {
  const [step, setStep] = useState(1);

  const [showDropDown, setShowDropDown] = useState(false);

  const { id, isCreative } = useCurrentUser();

  const { data: creative } = useGetCreativeById(id, isCreative);

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
        router.push(
          `/creative/dashboard/${creative?.brandName.toLowerCase()}~${creative?._id.substring(0, 16)}`
        );
      },
    });
  };

  return (
    <main onClick={() => setShowDropDown(false)}>
      <nav className="nav_container">
        <div />

        <div className="relative">
          <NavAccount
            onClick={() => {
              setShowDropDown((prev) => !prev);
            }}
            opened={showDropDown}
          />

          {showDropDown && (
            <DropDown extraClasses="right-0 mt-2">
              <Link
                href={"/signout"}
                className="text-sm font-medium hover:bg-gray px-5 py-3"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign Out
              </Link>
            </DropDown>
          )}
        </div>
      </nav>

      <section className="flex_center justify-between paddingX border-b-[1px] border-grey h-40">
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

      <section className="grid grid-cols-2 gap-[10%] paddingX py-24 ">
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
                        onClick={() => setStep(2)}
                        extraClasses="bg-customblack text-white px-10 py-4 "
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
                        onClick={() => setStep((prev) => prev - 1)}
                        extraClasses="text-customblack border-grey border-[1px] px-10 py-4"
                      />

                      <CustomButton
                        label="Next"
                        type="button"
                        onClick={() => setStep(3)}
                        extraClasses="bg-customblack text-white px-10 py-4"
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
                  <div className="flex flex-col gap-10 items-start">
                    <UploadLogo />

                    <span className="flex gap-10 self-end">
                      <CustomButton
                        label="Previous"
                        type="button"
                        onClick={() => setStep((prev) => prev - 1)}
                        extraClasses="text-customblack border-black border-[2px]  px-10 py-4"
                      />

                      <CustomButton
                        label="Finish"
                        type="submit"
                        extraClasses="bg-customblack text-white  px-10 py-4"
                      />
                    </span>

                    <span>
                      {isError && (
                        <CustomError message={error?.response?.data.message} />
                      )}

                      {isPending && <OverlayLoader />}
                    </span>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </section>
    </main>
  );
};

export default CreativeAccountSetup;
