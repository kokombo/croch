import { Formik, Form, FormikHelpers } from "formik";
import { FlatGreenButton, SelectAccountType, TextField } from "@/components";
import { icons } from "@/constants";
import { SetStateAction, Dispatch, useState } from "react";
import { signupFormValidationSchema } from "@/utilities/validation/form-validations";
import {
  useSignup,
  useUpdatePassword,
} from "@/utilities/api-interactions/user";
import { signIn } from "next-auth/react";
import { setOpenSignupModal } from "@/redux/slices/modal";
import { useDispatch } from "react-redux";
import { DispatchType } from "@/redux/store";

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

  const { mutateAsync, data, isError, isPending, error } = useSignup();

  const createAccount = async (
    values: SignupDataType,
    onsubmitProps: FormikHelpers<SignupDataType>
  ) => {
    await mutateAsync({ ...values }).then(async () => {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "",
        redirect: false,
      }).then((res) => {
        if (res?.ok) {
          dispatch(setOpenSignupModal(false));
          onsubmitProps.resetForm();
        }
      });
    });
  };

  return (
    <div className="flex flex-col gap-8 ">
      <h2 className="text-3xl font-bold">
        {props.step === 1
          ? "Create an Account"
          : props.step === 2
            ? "Welcome to Croch"
            : props.step === 3
              ? "Enter Your Personal Details"
              : props.step === 4
                ? "Create Your Password"
                : ""}
      </h2>

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
                <div className="flex flex-col gap-8">
                  <SelectAccountType
                    name="role"
                    label="Select account type"
                    data={[
                      {
                        img: icons.customer,
                        value: "Customer",
                        iconHeight: `${177}`,
                        iconWidth: `${172}`,
                      },

                      {
                        img: icons.creative,
                        value: "Creative",
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
                <div className="flex flex-col gap-8">
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
                <div className="flex flex-col gap-8">
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
                <div className="flex flex-col gap-8">
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

                  <FlatGreenButton label="Create Account" type="submit" />

                  {isPending && <p>loading...</p>}

                  {isError && <p>{error?.response?.data.message} </p>}
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
