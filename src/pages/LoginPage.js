import React, { useState } from 'react'
// material-ui imports
import { Card, Typography, CardContent, Button, Box, CardActions, Grid, TextField } from '@mui/material'
//firebase imports
import {
  getAuth,
  signInWithEmailAndPassword,

} from "firebase/auth";
//validators imports
import { useFormik } from 'formik';
import * as yup from 'yup';
//router imports
import { NavLink, useNavigate } from 'react-router-dom';
function LoginPage() {
  const auth = getAuth();
  const navigate = useNavigate()

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
  });


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signInWithEmailAndPassword(auth, values.email, values.password).then((userCreds) => {
        navigate('/blogform')

      }).catch((error) => {
        if (error.code === "auth/user-not-found") {
          setError("User Not Found")
        }
        else if (error.code === "auth/wrong-password") {
          setError("Invalid password")
        }
        else {
          setError("Something went wrong!Please Try Again.")
        }
      })
    },
  });
  return (
    <React.Fragment>
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Card sx={{ width: 500, padding: 2 }} className="authCards" >
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
                    onBlurCapture={formik.handleBlur}
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </div>

                <div>
                  <TextField
                    onBlurCapture={formik.handleBlur}
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete='true'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </div>

              </Box>
            </CardContent>
            <CardActions>
              <span className='mx-auto'>
                <Button color="primary" variant="contained" fullWidth onClick={formik.handleSubmit}>
                  Login
                </Button>
              </span>
            </CardActions>
            <Box >
              <Typography fontSize={12} sx={{ textAlign: "center" }} color="red">
                {error}
              </Typography>
            </Box>
            <Button fullWidth component={NavLink} to="/signup" >
              Don't have an account? SignUp
            </Button>
          </Card>
        </Grid>
      </div>

    </React.Fragment>
  )
}

export default LoginPage
