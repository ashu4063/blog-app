// material ui imports
import { Card, Typography, CardContent, Button, Box, CardActions, TextField, Stack, Select, InputLabel, FormControl, Checkbox, MenuItem, ListItemText, Modal } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
// validators import
import { useFormik } from 'formik';
import * as yup from 'yup';
// Firestore imports
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebaseConfig'
//redux imports
import { connect } from 'react-redux';
import { getUserData } from '../store/actions/userActions';

// Styling for UI
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const BlogForm = ({ dispatch, loading, user, hasErrors }) => {
  const categoiries = [
    'Food',
    'Sports',
    'Music',
    'Lifestyle',
    'Fitness',
    'DIY',
    'Travel',
    'Fashion',
  ];
  useEffect(() => {
    dispatch(getUserData())
  }, [])
  const auth = getAuth()
  const navigate = useNavigate();

  const blogsCollectionRef = collection(db, "blogs");

  const [modal, setModal] = useState({ msg: "", open: false, page: false })
  const [id] = useState(window.location.pathname.slice(10))

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (id !== "" && !loading) {
          getBlog();
        }
      }
      else {
        window.location.href = '/';
      }
    })
  }, [loading])


  const getBlog = async () => {
    const singleBlogCollectionRef = doc(db, "blogs", id);
    getDoc(singleBlogCollectionRef).then((data) =>
      formik.setValues(data?.data())
    )
  }
  const validationSchema = yup.object({
    blogTitle: yup
      .string()
      .required('Blog Title is required'),
    blogSubTitle: yup
      .string('Enter Sub Title'),
    category: yup
      .array()
      .required('Category is required'),
    blogData: yup
      .string()
      .required("Blog Data is required")
  });
  const formik = useFormik({
    initialValues: {
      blogTitle: '',
      blogSubTitle: '',
      category: [],
      blogData: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      onAuthStateChanged(auth, (user) => {
        if (id !== "") {
          const singleBlogCollectionRef = doc(db, "blogs", id);
          updateDoc(singleBlogCollectionRef, values).then((data) => {
            setModal({ msg: "Blog SuccessFully Updated!", open: true, page: true })

          }
          )
            .catch((error) => {
              setModal({ msg: "Something Went Wrong! Please try Again.", open: true, page: false })
            })

        } else {
          addDoc(blogsCollectionRef, {
            blogTitle: values.blogTitle,
            category: values.category,
            blogSubTitle: values.blogSubTitle,
            blogData: values.blogData,
            author: { name: user?.displayName, id: user?.uid }

          }).then((data) => {
            setModal({ msg: "Blog Success Fully Posted!", open: true, page: true })
          }).catch((error) => {
            setModal({ msg: "Something Went Wrong! Please try Again.", open: true, page: false })
          })


        }

      })
    }
  });

  const handleClose = () => {
    setModal({ msg: "", open: false })
  }

  return (
    <React.Fragment>
      <Card sx={{ py: 3 }}>
        <CardContent>
          <Typography variant='h6' sx={{ textAlign: "center" }}>Fill Up all Blog Data</Typography>
          <Box component="form" sx={{
            '& .MuiTextField-root': { m: 1, width: "-webkit-fill-available" },

          }}
          >
            <Stack spacing={1}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField id="blogTitle" name="blogTitle" label="Enter Blog Title" onBlurCapture={formik.handleBlur}
                  value={formik.values?.blogTitle}
                  onChange={formik.handleChange}
                  error={formik.touched.blogTitle && Boolean(formik.errors.blogTitle)}
                  helperText={formik.touched.blogTitle && formik.errors.blogTitle} />

                <TextField id="blogSubTitle" name="blogSubTitle" label="Enter Blog Sub-Title"
                  onBlurCapture={formik.handleBlur}
                  value={formik.values?.blogSubTitle}
                  onChange={formik.handleChange}
                  error={formik.touched.blogSubTitle && Boolean(formik.errors.blogSubTitle)}
                  helperText={formik.touched.blogSubTitle && formik.errors.blogSubTitle}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl sx={{ m: 1, width: "40%" }} id="multiSelect">
                  <InputLabel id="demo-multiple-checkbox-label"  >Category</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    name="category"
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    helpertext={formik.touched.category && formik.errors.category}
                    multiple
                    onBlurCapture={formik.handleBlur("category")}
                    value={formik.values?.category}
                    onChange={formik.handleChange("category")}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {categoiries.map((cat) => (
                      <MenuItem key={cat} value={cat} >
                        <Checkbox checked={formik.values?.category.indexOf(cat) > -1} />
                        <ListItemText primary={cat} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  id="blogData"
                  name="blogData"
                  label="Enter main Blog Data"
                  multiline
                  rows={4}
                  onBlurCapture={formik.handleBlur}
                  value={formik.values?.blogData}
                  onChange={formik.handleChange}
                  error={formik.touched.blogData && Boolean(formik.errors.blogData)}
                  helperText={formik.touched.blogData && formik.errors.blogData}
                />
              </Stack>
            </Stack>
          </Box>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" sx={{ mx: "auto" }} onClick={formik.handleSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={modal.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modal.msg}
          </Typography>
          <Button variant='contained' color="primary" sx={{ mt: 3, mx: "auto" }} onClick={() => modal.page === true ? navigate('/bloglist') : handleClose()}> Okay</Button >
        </Box>
      </Modal>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.user,
  hasErrors: state.user.hasErrors,
})

export default connect(mapStateToProps)(BlogForm)