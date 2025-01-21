import * as yup from "yup";

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email type")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email type")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email type")
    .required("Email is required"),
});
