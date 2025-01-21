import { Formik } from "formik";
import { forgotPasswordSchema } from "../../validations/auth.validation";
import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Logo from "../../assets/pikoria.png";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../redux/store.redux";
import { resetPassword } from "../../redux/authSlice.redux";

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  return (
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
          initialValues={{ email: "" }}
          validationSchema={forgotPasswordSchema}
          onSubmit={async (values) =>
            await dispatch(resetPassword({ email: values.email }))
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
              <Stack p={4} gap={3}>
                <Stack alignItems="center" direction="row" gap={1}>
                  <Avatar
                    variant="square"
                    sx={{ width: 20, height: 20 }}
                    src={Logo}
                  />
                  <Typography>PIKORIA</Typography>
                </Stack>
                <Typography variant="h5">Reset password</Typography>
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
                </Stack>
                <Button type="submit" variant="contained">
                  Send reset password link
                </Button>
                <Divider>or</Divider>
                <Button variant="outlined" startIcon={<GoogleIcon />}>
                  Sign in with Google
                </Button>
                <Stack direction="row" gap={1} justifyContent="center">
                  <Typography fontSize={14}>Return to sign in page</Typography>
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
  );
};
