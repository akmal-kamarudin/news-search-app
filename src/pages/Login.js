import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Grid, TextField, Button, Box, LinearProgress, Typography } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import { useSnackbar } from "notistack";

const Login = () => {
  const user = {
    userName: "John",
    password: "1234",
  };

  const LOCAL_STORAGE_KEY1 = "isLoggedIn";
  const LOCAL_STORAGE_KEY2 = "userName";

  const [inputs, setInputs] = useState({
    userName: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY2)) ?? "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY1)) ?? false
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY1, JSON.stringify(isLoggedIn));
    localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(inputs.userName));
  }, [isLoggedIn, inputs]);

  const [isLoginInProgress, setIsLoginInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  // Error alert
  useEffect(() => {
    const variant = errorMessage;
    const position = { vertical: "bottom", horizontal: "center" };

    if (errorMessage === "error") {
      enqueueSnackbar("Error Message! Wrong login details.", {
        variant,
        anchorOrigin: position,
        autoHideDuration: 1500,
      });
    } else if (errorMessage === "warning") {
      enqueueSnackbar("Warning Message! All the fields are mandatory.", {
        variant,
        anchorOrigin: position,
        autoHideDuration: 1500,
      });
    } else if (errorMessage === "success") {
      enqueueSnackbar("Success! Welcome to the Homepage.", {
        variant,
        anchorOrigin: position,
        autoHideDuration: 2000,
      });
    }

    setErrorMessage("");
  }, [errorMessage, enqueueSnackbar]);

  // Progress bar
  useEffect(() => {
    if (isLoginInProgress) {
      setTimeout(() => {
        setIsLoginInProgress(false);
        setIsLoggedIn(true);
        setErrorMessage("success");
      }, 1000);
    }
  }, [isLoginInProgress]);

  if (isLoggedIn) return <Navigate to="/home"></Navigate>;

  // Login button
  const loginButton = (e) => {
    e.preventDefault();

    if (inputs.userName === "" || inputs.password === "") {
      setInputs({ userName: "", password: "" });
      setErrorMessage("warning");
      return;
    }

    if (inputs.userName === user.userName && inputs.password === user.password) {
      setIsLoginInProgress(true);
    } else {
      setIsLoggedIn(false);
      setInputs({ userName: "", password: "" });
      setErrorMessage("error");
    }
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "70vh" }}
      >
        <Grid sx={{ mb: 2 }}>
          <Typography
            variant="h4"
            color={deepPurple[700]}
            sx={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            Today's News
          </Typography>
        </Grid>
        <form onSubmit={loginButton}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              m: 1,
              width: "60ch",
              height: "40ch",
              borderRadius: "6px",
              backgroundColor: "rgba(250, 250, 250, 0.5)",
            }}
          >
            <TextField
              label="Name"
              variant="outlined"
              type="text"
              value={inputs.userName}
              onChange={(e) =>
                setInputs((inputs) => ({ ...inputs, userName: e.target.value }))
              }
              sx={{ m: 2, width: "36ch" }}
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={inputs.password}
              onChange={(e) =>
                setInputs((inputs) => ({ ...inputs, password: e.target.value }))
              }
              sx={{ m: 2, width: "36ch" }}
            />

            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{
                m: 2,
                mb: 0,
                width: "37ch",
              }}
              onClick={() => setErrorMessage(errorMessage)}
            >
              Login
            </Button>
            <Box sx={{ width: "36ch" }}>
              {isLoginInProgress ? <LinearProgress color="secondary" /> : <></>}
            </Box>
            <Typography
              variant="subtitle2"
              color={grey[900]}
              sx={{ fontStyle: "italic", fontWeight: "bold", textAlign: "center", mt: 2 }}
            >
              *Please login using the following details: - <br />
              Username: John , Password: 1234
            </Typography>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default Login;
