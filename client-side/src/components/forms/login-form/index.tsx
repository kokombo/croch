import { FlatGreenButton, TextField } from "@/components";
import { Formik, Form } from "formik";
import { useState } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-10 ">
      <h2 className="text-3xl font-bold">Welcome back</h2>

      <Formik initialValues={{ name: "" }} onSubmit={() => {}}>
        <Form className="flex flex-col gap-6">
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
            <FlatGreenButton label="Sign in" onClick={() => {}} />

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
