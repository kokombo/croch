import { CustomError, H2, H6 } from "@/components";
import { TextField } from "@/components/input-fields";
import { FlatGreenButton } from "@/components/buttons";
import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import { useState } from "react";
import { loginFormValidationSchema } from "@/utilities";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setOpenLoginModal, setOpenSignupModal } from "@/redux/slices/modal";
import type { DispatchType } from "@/redux/store";
import { useClearErrorMessage } from "@/utilities/hooks/useClearErrorMessage";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);

  const dispatch: DispatchType = useDispatch();

  const login = async (
    values: LoginData,
    onsubmitProps: FormikHelpers<LoginData>
  ) => {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        ...values,
        callbackUrl: window.location.href,
        redirect: false,
      });

      if (res?.ok) {
        dispatch(setOpenLoginModal(false));
        document.body.style.overflow = "auto";
        onsubmitProps.resetForm();
      }

      if (res?.error) {
        setError(res.error || "Something went wrong, please try again.");
      }
    } catch (error) {
      return setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  useClearErrorMessage(setError);

  return (
    <div className="flex flex-col gap-8 ">
      <div>
        <H2>Welcome!</H2>

        <span className="flex items-center gap-1">
          <H6>Don{"'"}t have an account?</H6>

          <button
            type="button"
            onClick={() => {
              dispatch(setOpenLoginModal(false));
              dispatch(setOpenSignupModal(true));
            }}
            className="text-sm font-bold underline"
          >
            Sign up
          </button>
        </span>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={login}
        validationSchema={loginFormValidationSchema}
      >
        <Form className="form">
          <TextField
            name="email"
            id="email"
            type="text"
            placeholder="Email Address"
          />

          <TextField
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            passwordField={true}
            togglePasswordVisibilityIcon={() =>
              setShowPassword((prev) => !prev)
            }
          />

          <span className="flex_col_center gap-1">
            <FlatGreenButton
              label={loading ? "Signing in..." : "Sign in"}
              type="submit"
              disabled={loading}
            />

            {error && <CustomError message={error} />}
          </span>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
