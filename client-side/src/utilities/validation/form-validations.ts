import * as Yup from "yup";

export const loginFormValidationSchema = Yup.object({
  email: Yup.string()
    .required("Enter your email address")
    .email("Invalid email format"),
  password: Yup.string().required("Enter your password"),
});

export const signupFormValidationSchema = Yup.object({
  role: Yup.string().required("Select account type"),
  email: Yup.string()
    .required("Enter your email address")
    .email("Invalid email format"),
  firstName: Yup.string().required("first name is required "),
  lastName: Yup.string().required("last name is required"),
  password: Yup.string()
    .required("Enter your password")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
});

export const validationSchemas = [
  Yup.object().shape({
    role: Yup.string().required("Select account type"),
  }),

  Yup.object().shape({
    email: Yup.string()
      .required("Enter your email address")
      .email("Invalid email format"),
  }),

  Yup.object().shape({
    firstName: Yup.string().required("First name is required "),
    lastName: Yup.string().required("Last name is required"),
  }),

  Yup.object().shape({
    password: Yup.string()
      .required("Enter your password")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm your password"),
  }),
];
