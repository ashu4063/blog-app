import React, { useState, useEffect } from 'react'
//firestore imports
import { db } from '../firebaseConfig'
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import {
    getAuth,
} from "firebase/auth";
// material ui imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    Grid,
    Chip,
    Paper
} from '@mui/material'
// router imports
import { useNavigate } from 'react-router-dom';
const BlogLanding = () => {
    const auth = getAuth()
    const navigate = useNavigate()

    const [id] = useState(window.location.pathname.slice(6))
    const [blog, setBlog] = useState()
    const [blogList, setBlogList] = useState([])

    const blogsCollectionRef = collection(db, "blogs");

    useEffect(() => {
        getBlogs();
    }, [id])
    useEffect(() => {
        getBlog();
    }, [id])

    const getBlog = async () => {
        const singleBlogCollectionRef = doc(db, "blogs", id);

        getDoc(singleBlogCollectionRef).then((data) =>
            setBlog(data?.data())
        )
    }

    const getBlogs = async () => {
        const data = await getDocs(blogsCollectionRef)
        let array = []
        data.docs.map((doc) =>
            array.push({ ...doc.data(), id: doc.id }));
        array = array.filter(d => d.id !== id)
        setBlogList(array.splice(0, 3))
    }

    if (blog) {
        return (
            <section className='mx-5 my-4'>
                <h1>{blog?.blogTitle}</h1>
                <Box sx={{ mt: 2 }}>
                    {blog?.category.map((cat, index) =>
                        <Chip label={cat} key={index} sx={{ ml: 0.5 }} />
                    )}
                </Box>
                <Grid container spacing={2}>

                    <Grid item md={9} >
                        <Box sx={{ mt: 2 }}>
                            <Typography color="text.secondary">
                                {blog?.blogSubTitle}
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{ whiteSpace: "pre-line" }}>
                                {blog?.blogData}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={3} >
                        <Paper sx={{ p: 2, my: 2 }}>
                            <Typography sx={{ fontSize: 20 }} color="grey.secondary">
                                Other Blogs
                            </Typography>
                            <div>
                                {blogList?.map((blog, index) => <Card sx={{ mt: 2 }} key={index}>
                                    <Box sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={7}>
                                                    <Typography sx={{ fontSize: 16 }} gutterBottom>
                                                        {blog?.blogTitle}
                                                    </Typography>



                                                </Grid>
                                                <Grid item xs={5}>
                                                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                                                        Author: {blog?.author?.name}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions>
                                            <a href={"/blog/" + blog.id}><Button size="small"  >Read Blog</Button></a>
                                        </CardActions>
                                    </Box>
                                </Card>)}

                            </div>
                            <Button size="small" sx={{ mt: 2 }} onClick={() => navigate('/')}>View More</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </section >
        )
    }
    else {
        return (
            <Typography sx={{ fontSize: 20, mt: 10 }} gutterBottom>
                Loading...
            </Typography>)
    }
}

export default BlogLanding
