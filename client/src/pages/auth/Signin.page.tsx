import { Formik } from "formik";
import { signinSchema } from "../../validations/auth.validation";
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
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store.redux";
import { signin, signinWithGoogle } from "../../redux/authSlice.redux";
import { Logo } from "../../comp/Logo.comp";
import { Authenticated } from "../../comp/Authenticated.comp";

export const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

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
            initialValues={{ email: "", password: "" }}
            validationSchema={signinSchema}
            onSubmit={async (values) =>
              await dispatch(
                signin({ email: values.email, password: values.password })
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
                  <Stack direction="row" justifyContent="space-between">
                    <Logo />
                    <IconButton onClick={() => navigate("/home")} size="small">
                      <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Typography variant="h5">Sign in</Typography>
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
                      type={showPassword ? "text" : "password"}
                      error={Boolean(errors.password && touched.password)}
                      id="password"
                      label="Password"
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                size="small"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOffIcon fontSize="small" />
                                ) : (
                                  <VisibilityIcon fontSize="small" />
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
                    <Link
                      component={NavLink}
                      to="/auth/forgotPassword"
                      fontSize={14}
                      alignSelf="end"
                      underline="hover"
                    >
                      Forgot password?
                    </Link>
                  </Stack>
                  <Button type="submit" loading={loading} variant="contained">
                    Sign in
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
                      Don't have an account?
                    </Typography>
                    <Link
                      component={NavLink}
                      to="/auth/signup"
                      fontSize={14}
                      underline="hover"
                    >
                      Sign up
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
