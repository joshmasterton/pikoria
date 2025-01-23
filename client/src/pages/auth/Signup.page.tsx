import { Formik } from "formik";
import { signupSchema } from "../../validations/auth.validation";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store.redux";
import { signinWithGoogle, signup } from "../../redux/authSlice.redux";
import { Logo } from "../../comp/Logo.comp";
import { Authenticated } from "../../comp/Authenticated.comp";

export const Signup = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleShowPassword = (value: keyof typeof showPasswords) => {
    setShowPasswords((prevValue) => ({
      ...prevValue,
      [value]: !prevValue[value],
    }));
  };

  return (
    <Authenticated>
      <Container
        maxWidth="xs"
        disableGutters
        sx={{
          p: 2,
          minHeight: "100vh",
          alignContent: "center",
        }}
      >
        <Card variant="outlined">
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={signupSchema}
            onSubmit={async (values) =>
              await dispatch(
                signup({ email: values.email, password: values.password })
              )
            }
          >
            {({
              values,
              errors,
              handleBlur,
              touched,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Stack p={3} gap={2}>
                  <Logo />
                  <Typography variant="h5">Sign up</Typography>
                  <Stack gap={2}>
                    <TextField
                      size="small"
                      type="email"
                      onBlur={handleBlur}
                      error={Boolean(errors.email && touched.email)}
                      id="email"
                      label="Email"
                      value={values.email}
                      onChange={handleChange}
                      aria-label="email"
                      helperText={errors.email && touched.email && errors.email}
                    />
                    <TextField
                      size="small"
                      onBlur={handleBlur}
                      type={showPasswords.password ? "text" : "password"}
                      error={Boolean(errors.password && touched.password)}
                      id="password"
                      label="Password"
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => handleShowPassword("password")}
                              >
                                {showPasswords.password ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      value={values.password}
                      onChange={handleChange}
                      aria-label="password"
                      helperText={
                        errors.password && touched.password && errors.password
                      }
                    />
                    <TextField
                      size="small"
                      onBlur={handleBlur}
                      type={showPasswords.confirmPassword ? "text" : "password"}
                      error={Boolean(
                        errors.confirmPassword && touched.confirmPassword
                      )}
                      id="confirmPassword"
                      label="Confirm Password"
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  handleShowPassword("confirmPassword")
                                }
                              >
                                {showPasswords.confirmPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      aria-label="confirmPassword"
                      helperText={
                        errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword
                      }
                    />
                  </Stack>
                  <Button type="submit" loading={loading} variant="contained">
                    Sign up
                  </Button>
                  <Divider>or</Divider>
                  <Button
                    variant="outlined"
                    loading={loading}
                    onClick={async () => await dispatch(signinWithGoogle())}
                    startIcon={<GoogleIcon />}
                  >
                    Sign in with Google
                  </Button>
                  <Stack direction="row" gap={1} justifyContent="center">
                    <Typography fontSize={14}>
                      Already have an account?
                    </Typography>
                    <Link
                      component={NavLink}
                      to="/auth/signin"
                      fontSize={14}
                      underline="hover"
                    >
                      Sign in
                    </Link>
                  </Stack>
                </Stack>
              </form>
            )}
          </Formik>
        </Card>
      </Container>
    </Authenticated>
  );
};
