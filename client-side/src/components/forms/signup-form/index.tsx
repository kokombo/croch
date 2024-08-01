import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import { CustomError, H2 } from "@/components";
import { SelectAccountType, TextField } from "@/components/input-fields";
import { FlatGreenButton } from "@/components/buttons";
import { icons } from "@/constants";
import { useState } from "react";
import type { SetStateAction, Dispatch } from "react";
import { signupFormValidationSchema } from "@/utilities/validation/form-validations";
import { useSignup } from "@/utilities/api-interactions/user";
import { signIn } from "next-auth/react";
import { setOpenSignupModal } from "@/redux/slices/modal";
import { useDispatch } from "react-redux";
import type { DispatchType } from "@/redux/store";
import { useClearErrorMessage } from "@/utilities/hooks/useClearErrorMessage";

type Props = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "",
};

const SignupForm = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch: DispatchType = useDispatch();

  const { mutateAsync, isPending, error, setError } = useSignup();

  const createAccount = async (
    values: SignupDataType,
    onsubmitProps: FormikHelpers<SignupDataType>
  ) => {
    await mutateAsync({ ...values }).then(async () => {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: window.location.href,
        redirect: false,
      }).then((res) => {
        if (res?.ok) {
          dispatch(setOpenSignupModal(false));
          document.body.style.overflow = "auto";
          onsubmitProps.resetForm();
        }
      });
    });
  };

  useClearErrorMessage(setError);

  return (
    <div className="flex flex-col gap-6 lg:gap-8 ">
      <H2>
        {props.step === 1
          ? "Create an Account"
          : props.step === 2
          ? "Welcome to Croch"
          : props.step === 3
          ? "Enter Your Personal Details"
          : props.step === 4
          ? "Create Your Password"
          : ""}
      </H2>

      <Formik
        initialValues={initialValues}
        onSubmit={createAccount}
        validationSchema={signupFormValidationSchema}
        validateOnChange
        validateOnBlur
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              {props.step === 1 && (
                <div className="form">
                  <SelectAccountType
                    name="role"
                    label="Select account type"
                    data={[
                      {
                        img: icons.customer,
                        value: "customer",
                        iconHeight: `${177}`,
                        iconWidth: `${172}`,
                      },

                      {
                        img: icons.creative,
                        value: "creative",
                        iconHeight: `${166}`,
                        iconWidth: `${294}`,
                      },
                    ]}
                  />

                  <FlatGreenButton
                    label="Continue"
                    onClick={() => props.setStep(2)}
                    type="button"
                    disabled={!formik.values.role}
                  />
                </div>
              )}

              {props.step === 2 && (
                <div className="form">
                  <TextField
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                  />

                  <FlatGreenButton
                    label="Continue"
                    onClick={() => props.setStep(3)}
                    type="button"
                    disabled={
                      !formik.values.email || Boolean(formik.errors.email)
                    }
                  />
                </div>
              )}

              {props.step === 3 && (
                <div className="form">
                  <TextField
                    name="firstName"
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                  />

                  <TextField
                    name="lastName"
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                  />

                  <FlatGreenButton
                    label="Continue"
                    onClick={() => props.setStep(4)}
                    type="button"
                    disabled={
                      !formik.values.firstName ||
                      Boolean(formik.errors.firstName) ||
                      Boolean(formik.errors.lastName)
                    }
                  />
                </div>
              )}

              {props.step === 4 && (
                <div className="form">
                  <TextField
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    passwordField={true}
                    type={showPassword ? "text" : "password"}
                    togglePasswordVisibilityIcon={() =>
                      setShowPassword((prev) => !prev)
                    }
                  />

                  <TextField
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Re-enter password"
                    passwordField={true}
                    type={showPassword ? "text" : "password"}
                    togglePasswordVisibilityIcon={() =>
                      setShowPassword((prev) => !prev)
                    }
                  />

                  <span className="flex_col_center gap-1">
                    <FlatGreenButton
                      label="Create Account"
                      type="submit"
                      disabled={isPending}
                    />

                    {!!error && (
                      <CustomError message={error} extraClasses="self-center" />
                    )}
                  </span>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignupForm;
