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
  firstName: Yup.string()
    .required("First name is required ")
    .matches(/^\S(.*\S)?$/, "First name is required"),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^\S(.*\S)?$/, "Last name is required"),
  password: Yup.string()
    .required("Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "At least 8 characters, a letter, a number and a special character."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
});

export const updatePasswordValidationSchema = Yup.object({
  password: Yup.string()
    .required("Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "At least 8 characters, a letter, a number and a special character."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
});

export const creativeAccountSetupValidationSchema = Yup.object({
  brandName: Yup.string()
    .required("Enter your brand name.")
    .min(10, "Enter at least 10 characters.")
    .max(50, "Max 50 characters.")
    .matches(/^\S(.*\S)?$/, "Enter your brand name"),
  personalDescription: Yup.string()
    .required("Tell us about you and your brand.")
    .min(200, "Enter at least 200 characters.")
    .max(500, "Max 500 characters.")
    .matches(/^\S(.*\S)?$/, "Tell us about you and your brand"),
  yearsOfExperience: Yup.number()
    .required("Help customers understand how long you've been doing this.")
    .test("len", "Invalid input", (val) => val.toString().length < 3),
  funFacts: Yup.array().of(
    Yup.string()
      .required("Fun fact is required")
      .min(50, "Enter at least 50 characters")
      .max(150, "Max 150 characters")
      .matches(/^\S(.*\S)?$/, "Fun fact is required")
  ),
});

export const uploadProductValidationSchema = Yup.object({
  title: Yup.string()
    .required("Product title is required")
    .matches(/^\S(.*\S)?$/, "Product title is required"),
  availability: Yup.string()
    .required("Product availability type is required")
    .matches(/^\S(.*\S)?$/, "Product availability type is required"),
  price: Yup.string()
    .required("Product price is required")
    .matches(/^\S(.*\S)?$/, "Product price is required"),
  description: Yup.string()
    .required("Product description is required")
    .matches(/^\S(.*\S)?$/, "Product description is required"),
  gender: Yup.string().required("Select one of the above"),
  nationwideDelivery: Yup.boolean().required(
    "Specify available delivery option"
  ),
  primaryLocation: Yup.object({
    name: Yup.string()
      .required("Choose primary delivery location")
      .matches(/^\S(.*\S)?$/, "Choose primary delivery location"),
    minDeliveryDays: Yup.number().required(
      "Choose minimum order fulfilment days for primary delivery location"
    ),
    maxDeliveryDays: Yup.number().required(
      "Choose maximum order fulfilment days for primary delivery location"
    ),
  }),
  tag: Yup.string().required("Choose a product tag"),
  photos: Yup.mixed().required("Select product photos to showcase your work"),
});

export const adminSignupValidationSchema = Yup.object({
  email: Yup.string()
    .required("Enter your email address")
    .email("Invalid email format"),
  firstName: Yup.string()
    .required("First name is required ")
    .matches(/^\S(.*\S)?$/, "First name is required"),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^\S(.*\S)?$/, "Last name is required"),
  password: Yup.string()
    .required("Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "At least 8 characters, a letter, a number and a special character."
    ),
});
