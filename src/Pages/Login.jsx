import {
  Box,
  TextField,
  Stack,
  createTheme,
  Button,
  Grid,
} from "@mui/material";
import React, { useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import logo from "../images/WhatsApp Image 2023-08-26 at 05.08.45.jpg";
import Logo from "../components/Logo";
import { userSchema } from "../validations/UserValidation";
import { Formik, setIn } from "formik";
import { request } from "../api/request";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [info, setInfo] = useState({ loading: false, error: false });
  const navigate = useNavigate();
  const submitHandler = (values) => {
    setInfo({ loading: true, error: false });

    request({ url: "/login", method: "POST", data: values })
      .then((resp) => {
        setInfo({ ...info, loading: false });
        // resp.data.data.token;
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("restaurant_id", resp.data.user.branch.id);
        navigate("/orders");
      })
      .catch((err) => {
        setInfo({ error: true, loading: false });
        console.log(err);
      });
  };

  return (
    <Box sx={{ padding: "0 1rem ", minHeight: { xs: "100%", md: "100vh" } }}>
      <Grid
        sx={{ minHeight: { xs: "100%", md: "100vh" } }}
        container
        spacing={2}
      >
        <Grid item md={6} xs={12}>
          <Logo />
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={userSchema}
            onSubmit={submitHandler}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Stack mt={"4rem"} spacing={3}>
                  <Box>
                    <TextField
                      label="Email"
                      type="string"
                      variant="outlined"
                      onBlur={handleBlur}
                      name="email"
                      onChange={handleChange}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <TextField
                      label="Password"
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      fullWidth
                    />
                  </Box>
                </Stack>
                <Box mt="3rem">
                  <LoadingButton
                    type={"submit"}
                    size="small"
                    loading={info.loading}
                    variant="contained"
                    fullWidth
                    sx={{
                      padding: "1rem",
                    }}
                  >
                    <span
                      style={{
                        // color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Log IN
                    </span>
                  </LoadingButton>
                </Box>
                {info.error && (
                  <Box
                    sx={{ color: "red", fontWeight: "bold", margin: "1rem 0" }}
                  >
                    Wrong Credential
                  </Box>
                )}
              </form>
            )}
          </Formik>
        </Grid>
        <Grid
          sx={{
            overFlow: "hidden",
            position: "relative",
            display: {
              md: "block",
              xs: "none",
            },
          }}
          md={6}
          xs={12}
          item
        >
          {/* <img
            style={{
              maxWidth: "100%",
              maxHeight: "100vh",
              borderImage: "cover",
              width: "auto",
              height: "auto",
              margin: "0 auto",
              display: "block",
            }}
            src={logo}
          /> */}
          <Box
            sx={{
              backgroundImage: `url("${logo}")`,
              backgroundRepeat: "no-repeat",
              backgourdPosition: "center center",
              backgroundSize: "cover",

              height: " 100vh",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: "56%",
                top: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <Logo />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
