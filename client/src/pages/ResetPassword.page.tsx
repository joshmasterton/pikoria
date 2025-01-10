import { ChevronLeft, CloseRounded, Google } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { NavLink, useNavigate } from "react-router";
import * as yup from "yup";
import { Logo } from "../comps/Logo.comp";
import { useAuthContext } from "../context/Auth.context";

const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email type")
    .required("Email required"),
});

export const ResetPassword = () => {
  const { signinWithGoogle, loadingUpdatedUser } = useAuthContext();
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      minHeight="100vh"
      p={2}
      display="flex"
      justifyContent="center"
      width="100%"
      useFlexGap
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
            initialValues={{ email: "" }}
            validationSchema={resetPasswordSchema}
            onSubmit={() => {}}
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
                    Reset password
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
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                  >
                    Send reset password link
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        sx={{ position: "absolute" }}
                      />
                    )}
                  </Button>
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
                  <Link
                    display="flex"
                    alignSelf="center"
                    color="textSecondary"
                    textAlign="center"
                    underline="hover"
                    component={NavLink}
                    to="/auth/login"
                  >
                    <ChevronLeft />
                    Back to login
                  </Link>
                </Stack>
              </form>
            )}
          </Formik>
        </Paper>
      </Stack>
    </Stack>
  );
};
