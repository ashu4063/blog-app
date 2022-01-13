import React, { useState } from 'react'
// matrial ui imports
import { Card, Typography, CardContent, Button, Box, CardActions, Grid, TextField } from '@mui/material'
// router imports
import { useNavigate, NavLink } from "react-router-dom";
//firebase imports
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// validators imports
import { useFormik } from 'formik';
import * as yup from 'yup';

function SignUp() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [error, setError] = useState()
  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    name: yup
      .string('Enter Your Name')
      .required("Name is required")
      .matches("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")
  });


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values)
    },
  });


  const onSubmit = (creds) => {
    createUserWithEmailAndPassword(auth, creds.email, creds.password).then((userCreds) => {
      updateProfile(auth.currentUser, {
        displayName: creds.name
      }).then((user) => {
        onAuthStateChanged(auth, (user) => {

          setDoc(doc(getFirestore(), "user", user.uid), {
            user: user.reloadUserInfo,
          }).then(() => {
            navigate("/blogform");
          })
            .catch((error) => {

              setError("Something went wrong!Please Try Again.")


            })

        })
      })
    }).catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        setError("Email Already in use")
      }
      else {
        setError("Something went wrong!Please Try Again.")

      }
    })
  }


  return (
    <React.Fragment>
      <div className=''>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"

        >
          <Card sx={{ width: 500, padding: 2 }} >
            <CardContent>
              <Typography variant='h4' color="text.secondary">
                Login
              </Typography>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: "-webkit-fill-available" },
                }}
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    onBlurCapture={formik.handleBlur}
                  />

                </div>
                <div>
                  <TextField

                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onBlurCapture={formik.handleBlur}
                  />
                </div>

                <div>
                  <TextField

                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete='true'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    onBlurCapture={formik.handleBlur}
                  />
                </div>

              </Box>
            </CardContent>
            <CardActions>
              <span className='mx-auto'>
                <Button color="primary" variant="contained" fullWidth onClick={formik.handleSubmit}>
                  Sign Up
                </Button>        </span>
            </CardActions>
            <Box >
              <Typography fontSize={12} sx={{ textAlign: "center" }} color="red">
                {error}
              </Typography>
            </Box>
            <Button fullWidth component={NavLink} to="/login" >
              Already have an account? LogIn
            </Button>
          </Card>
        </Grid>
      </div>

    </React.Fragment>
  )
}

export default SignUp;
