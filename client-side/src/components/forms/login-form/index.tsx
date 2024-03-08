import { FlatGreenButton, TextField } from "@/components";
import { Formik, Form, FormikHelpers } from "formik";
import { useState } from "react";
import { loginFormValidationSchema } from "@/utilities";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setOpenLoginModal } from "@/redux/slices/modal";
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
      const res = await signIn("credentials", {
        ...values,
        callbackUrl: "",
        redirect: false,
      });

      if (res?.ok) {
        dispatch(setOpenLoginModal(false));
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
    <div className="flex flex-col gap-10 ">
      <h2 className="text-3xl font-bold">Welcome back</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={login}
        validationSchema={loginFormValidationSchema}
        validateOnBlur={false}
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

          <span className="flex flex-col gap-5">
            <FlatGreenButton label="Sign in" type="submit" />

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            <p className="text-base font-medium text-neutral">
              By creating account, you acknowledge and accept our Terms of
              Service and Privacy Policy.
            </p>
          </span>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
