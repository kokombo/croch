import { CustomError, FlatGreenButton, TextField } from "@/components";
import { Formik, Form, FormikHelpers } from "formik";
import { useState } from "react";
import { loginFormValidationSchema } from "@/utilities";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setOpenLoginModal, setOpenSignupModal } from "@/redux/slices/modal";
import { DispatchType } from "@/redux/store";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
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
        document.body.style.overflow = "hidden";
        onsubmitProps.resetForm();
      }

      if (res?.error) {
        setError(res.error);
      }
    } catch (error: any) {
      return setError(
        error.message || "Something went wrong, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 ">
      <div>
        <h2 className="text-3xl font-bold">Welcome!</h2>
        <span className="flex items-center gap-1">
          <h4>Don{"'"}t have an account?</h4>
          <button
            type="button"
            onClick={() => {
              dispatch(setOpenLoginModal(false));
              dispatch(setOpenSignupModal(true));
            }}
            className="font-bold"
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
        <Form className="flex flex-col gap-8">
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

          <span className="flex flex-col items-center gap-1">
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
