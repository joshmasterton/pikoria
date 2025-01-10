import {
  CloseRounded,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import * as yup from "yup";
import { Logo } from "../comps/Logo.comp";
import { useAuthContext } from "../context/Auth.context";

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email type")
    .required("Email required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password required"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email type")
    .required("Email required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password required"),
});

export const Signup = () => {
  const navigate = useNavigate();
  const { signinWithGoogle, loadingUpdatedUser, signup } = useAuthContext();
  const [seePasswords, setSeePasswords] = useState({
    password: false,
    confirmPassword: false,
  });

  const changePasswordVisibility = (field: keyof typeof seePasswords) => {
    setSeePasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Stack
      direction="row"
      minHeight="100vh"
      p={2}
      display="flex"
      justifyContent="center"
      width="100%"
      gap={2}
    >
      <Stack
        alignItems="center"
        alignSelf="center"
        flex={1}
        width="100%"
        maxWidth={400}
      >
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            width: "100%",
          }}
        >
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={signupSchema}
            onSubmit={async (values) => {
              await signup(values.email, values.password);
            }}
          >
            {({
              values,
              errors,
              handleSubmit,
              handleBlur,
              handleChange,
              isSubmitting,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <Stack useFlexGap gap={2} sx={{ position: "relative" }}>
                  <IconButton
                    onClick={() => navigate("/categories")}
                    sx={{ position: "absolute", right: 9 }}
                  >
                    <CloseRounded />
                  </IconButton>
                  <Stack alignItems="center" pb={1}>
                    <Logo large />
                  </Stack>
                  <Typography variant="h4" pb={2}>
                    Signup
                  </Typography>
                  <TextField
                    fullWidth
                    error={errors.email && touched.email ? true : false}
                    size="small"
                    value={values.email}
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                    id="email"
                    label="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl size="small">
                    <InputLabel
                      error={errors.password && touched.password ? true : false}
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      error={errors.password && touched.password ? true : false}
                      size="small"
                      label="Password"
                      type={!seePasswords.password ? "password" : "string"}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => changePasswordVisibility("password")}
                          >
                            {!seePasswords.password ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.password && touched.password && (
                      <FormHelperText error>{errors.password}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl size="small">
                    <InputLabel
                      error={
                        errors.confirmPassword && touched.confirmPassword
                          ? true
                          : false
                      }
                    >
                      Confirm password
                    </InputLabel>
                    <OutlinedInput
                      id="confirmPassword"
                      label="Confirm password"
                      type={
                        !seePasswords.confirmPassword ? "password" : "string"
                      }
                      error={
                        errors.confirmPassword && touched.confirmPassword
                          ? true
                          : false
                      }
                      size="small"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              changePasswordVisibility("confirmPassword")
                            }
                          >
                            {!seePasswords.confirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <FormHelperText error>
                        {errors.confirmPassword}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <Button
                    type="submit"
                    disabled={isSubmitting && loadingUpdatedUser}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                  >
                    Signup
                    {loadingUpdatedUser && isSubmitting && (
                      <CircularProgress
                        size={24}
                        sx={{ position: "absolute" }}
                      />
                    )}
                  </Button>
                  <Stack justifyContent="center" direction="row" gap={1}>
                    <Typography>Already have an account?</Typography>
                    <Link
                      color="textSecondary"
                      underline="hover"
                      component={NavLink}
                      to="/auth/login"
                    >
                      Login
                    </Link>
                  </Stack>
                  <Divider>or</Divider>
                  <Box sx={{ position: "relative" }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      disabled={loadingUpdatedUser && !isSubmitting}
                      onClick={signinWithGoogle}
                      startIcon={<Google />}
                    >
                      Sign in with google
                      {loadingUpdatedUser && !isSubmitting && (
                        <CircularProgress
                          size={24}
                          sx={{ position: "absolute" }}
                        />
                      )}
                    </Button>
                  </Box>
                </Stack>
              </form>
            )}
          </Formik>
        </Paper>
      </Stack>
    </Stack>
  );
};

export const Login = () => {
  const navigate = useNavigate();
  const [seePassword, setSeePassword] = useState(false);
  const { loadingUpdatedUser, signinWithGoogle, login } = useAuthContext();

  const changePasswordVisibility = () => {
    setSeePassword(!seePassword);
  };

  return (
    <Stack
      direction="row"
      minHeight="100vh"
      p={2}
      display="flex"
      justifyContent="center"
      width="100%"
      gap={2}
    >
      <Stack
        alignItems="center"
        alignSelf="center"
        flex={1}
        width="100%"
        maxWidth={400}
      >
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            width: "100%",
          }}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              await login(values.email, values.password);
            }}
          >
            {({
              values,
              errors,
              handleSubmit,
              handleBlur,
              handleChange,
              isSubmitting,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <Stack useFlexGap gap={2} sx={{ position: "relative" }}>
                  <IconButton
                    onClick={() => navigate("/categories")}
                    sx={{ position: "absolute", right: 9 }}
                  >
                    <CloseRounded />
                  </IconButton>
                  <Stack alignItems="center" pb={1}>
                    <Logo large />
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                    pb={2}
                  >
                    <Typography variant="h4">Login</Typography>
                  </Stack>
                  <TextField
                    fullWidth
                    error={errors.email && touched.email ? true : false}
                    size="small"
                    value={values.email}
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                    id="email"
                    label="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl size="small">
                    <InputLabel
                      error={errors.password && touched.password ? true : false}
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      error={errors.password && touched.password ? true : false}
                      size="small"
                      label="Password"
                      type={!seePassword ? "password" : "string"}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => changePasswordVisibility()}
                          >
                            {!seePassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.password && touched.password && (
                      <FormHelperText error>{errors.password}</FormHelperText>
                    )}
                  </FormControl>
                  <Link
                    component={NavLink}
                    to="/auth/resetPassword"
                    underline="hover"
                    textAlign="end"
                    color="textSecondary"
                  >
                    Forgot password?
                  </Link>
                  <Button
                    type="submit"
                    disabled={loadingUpdatedUser && isSubmitting}
                    fullWidth
                    sx={{ mt: 3 }}
                    variant="contained"
                  >
                    Login
                    {loadingUpdatedUser && isSubmitting && (
                      <CircularProgress
                        size={24}
                        sx={{ position: "absolute" }}
                      />
                    )}
                  </Button>
                  <Stack justifyContent="center" direction="row" gap={1}>
                    <Typography>Don't have an account?</Typography>
                    <Link
                      color="textSecondary"
                      underline="hover"
                      component={NavLink}
                      to="/auth/signup"
                    >
                      Signup
                    </Link>
                  </Stack>
                  <Divider>or</Divider>
                  <Box sx={{ position: "relative" }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      disabled={loadingUpdatedUser && !isSubmitting}
                      onClick={signinWithGoogle}
                      startIcon={<Google />}
                    >
                      Sign in with google
                      {loadingUpdatedUser && !isSubmitting && (
                        <CircularProgress
                          size={24}
                          sx={{ position: "absolute" }}
                        />
                      )}
                    </Button>
                  </Box>
                </Stack>
              </form>
            )}
          </Formik>
        </Paper>
      </Stack>
    </Stack>
  );
};
