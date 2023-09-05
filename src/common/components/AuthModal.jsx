import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
  Link,
  Box,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AuthModal = ({ handleOpen, setHandleOpen }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
    setHandleOpen(false);
  };

  const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required("UserName is required"),
    password: Yup.string().required("Password is required"),
  });

  const signupValidationSchema = Yup.object().shape({
    username: Yup.string().required("UserName is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    if(errorMessage !== ""){
      setTimeout(() => {
        setErrorMessage("")
      },2000)
    }
  },[errorMessage])

  const initialValues =
    activeTab === 0
      ? { username: "", password: "" }
      : { name: "", email: "", password: "" };

  const validationSchema =
    activeTab === 0 ? loginValidationSchema : signupValidationSchema;

  const handleSubmit = async (values) => {
    console.log(values);
    if (activeTab === 0) {
      await axios
        .post("http://localhost:8090/auth/login", values)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            handleClose();
          }
        }).catch((err) => {
          setErrorMessage("Login failed. Please check your credentials.");
        });
        
    } else {
      await axios
        .post("http://localhost:8090/auth/register", values)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            handleClose();
          }
        })
        .catch((err) => {
          setErrorMessage("Signup failed. Please try again later.");
        });

    }
  };

  return (
    <div>
      <Dialog open={open || handleOpen} onClose={handleClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <DialogContent sx={{ width: "350px" }}>
                {activeTab === 0 && (
                  <Box p={1}>
                    <DialogTitle
                      textAlign="center"
                      fontSize={30}
                      fontWeight="700"
                      color="#17223B"
                    >
                      Login
                    </DialogTitle>
                    <Field
                      name="username"
                      as={TextField}
                      margin="normal"
                      label="UserName"
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                    <ErrorMessage
                      name="username"
                      component="span"
                      style={{ fontSize: "12px", color: "red" }}
                    />
                    <Field
                      name="password"
                      as={TextField}
                      margin="normal"
                      label="Password"
                      fullWidth
                      type="password"
                      variant="outlined"
                      size="small"
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      style={{ fontSize: "12px", color: "red" }}
                    />
                  </Box>
                )}
                {activeTab === 1 && (
                  <>
                    <DialogTitle
                      textAlign="center"
                      fontSize={30}
                      fontWeight="700"
                      color="#17223B"
                    >
                      Signup
                    </DialogTitle>
                    <Field
                      name="username"
                      as={TextField}
                      margin="normal"
                      label="UserName"
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                    <ErrorMessage
                      name="username"
                      component="span"
                      style={{ fontSize: "12px", color: "red" }}
                    />
                    <Field
                      name="email"
                      as={TextField}
                      margin="normal"
                      label="Email"
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      style={{ fontSize: "12px", color: "red" }}
                    />
                    <Field
                      name="password"
                      as={TextField}
                      margin="normal"
                      label="Password"
                      fullWidth
                      type="password"
                      variant="outlined"
                      size="small"
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      style={{ fontSize: "12px", color: "red" }}
                    />
                  </>
                )}
              </DialogContent>
              {errorMessage && (
                <Typography
                  fontSize={14}
                  style={{ color: "red", textAlign: "center" }}
                >
                  {errorMessage}
                </Typography>
              )}
              {activeTab === 0 ? (
                <DialogActions
                  sx={{
                    margin: "auto",
                    pb: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <Button variant="contained" sx={{ mb: 2 }} type="submit">
                    Login
                  </Button>
                  <Typography fontSize={14}>
                    Forgot Password? <Link>Click here</Link>
                  </Typography>
                  <Typography fontSize={14} sx={{ mt: 10 }}>
                    Don't have an account?{" "}
                    <Link
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setActiveTab(1);
                      }}
                    >
                      Signup
                    </Link>
                  </Typography>
                </DialogActions>
              ) : (
                <DialogActions
                  sx={{
                    margin: "auto",
                    pb: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <Button variant="contained" sx={{ mb: 2 }} type="submit">
                    Signup
                  </Button>
                  <Typography fontSize={14} sx={{ mt: 10 }}>
                    Already have an account?{" "}
                    <Link
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setActiveTab(0);
                      }}
                    >
                      Login
                    </Link>
                  </Typography>
                </DialogActions>
              )}
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default AuthModal;
