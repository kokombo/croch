"use client";

import {
  AccountSetupContainer,
  AccountSetupForm,
  AccountSetupBar,
  AccountSetupStepDescription,
} from "@/components/become-a-creative";
import {
  useAccountSetupDone,
  useSetupCreativeAccount,
} from "@/utilities/api-interactions/creative";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreativeAccountSetup = () => {
  const [step, setStep] = useState(1);

  const [showDropDown, setShowDropDown] = useState(false);

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
      onSuccess: (creative) => {
        confirmAccountSetup();
        onsubmitProps.resetForm();
        router.push(
          `/creative/dashboard/${creative?.brandName?.toLowerCase()}~${creative?._id?.substring(0, 16)}`
        );
      },
    });
  };

  return (
    <main onClick={() => setShowDropDown(false)}>
      <AccountSetupBar
        showDropDown={showDropDown}
        setShowDropDown={setShowDropDown}
      />

      <AccountSetupContainer step={step} />

      <section className="grid grid-cols-2 gap-[10%] paddingX py-24 ">
        <AccountSetupStepDescription step={step} />

        <AccountSetupForm
          step={step}
          isError={isError}
          isPending={isPending}
          error={error}
          finishAccountSetup={finishAccountSetup}
          setStep={setStep}
        />
      </section>
    </main>
  );
};

export default CreativeAccountSetup;
