import React, { useEffect, useState } from 'react'
//router imports
import { NavLink, useNavigate } from "react-router-dom";
//firebase imports
import {
    onAuthStateChanged
} from "firebase/auth";
import { getDocs, collection, doc, deleteDoc, query, where } from "firebase/firestore";
import { db, auth } from "../firebaseConfig"
//material-ui imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Popover, Typography, Box } from '@mui/material';
//redux imports
import { getUserData } from '../store/actions/userActions';
import { connect } from 'react-redux';

const BlogList = ({ loaded, user, hasErrors }) => {
    const userId = user?.uid
    const navigate = useNavigate()
    const [blogLists, setBlogList] = useState([]);
    const [target, setTarget] = useState({ target: null, id: "" });

    const id = target.id ? 'simple-popover' : undefined;

    const getBlogs = async () => {

        const blogsCollectionRef = query(collection(db, "blogs")
            , where("author.id", "==", userId));
        const data = await getDocs(blogsCollectionRef)
        setBlogList(data.docs.map((doc) =>
            ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (loaded===true) {
                    getBlogs();
                }
            }
            else {
                window.location.href = '/';
            }
        })
    }, [id, loaded])

    const handleClick = (event, id) => {
        setTarget({ target: event.currentTarget, id: id });
    };

    const handleClose = () => {
        setTarget({ target: null, id: "" });
    }

    const onDelete = async (id) => {
        await deleteDoc(doc(db, "blogs", id));
        getBlogs();
        setTarget({ target: null, id: "" });
    }
    return (
        <div>
            <h4>Blog List</h4>
            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                {blogLists.length !== 0 ?
                    <Table aria-label="simple table" id="blogTable">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr No.</TableCell>
                                <TableCell >Blog Title</TableCell>
                                <TableCell >Sub Title</TableCell>
                                <TableCell >Categoty</TableCell>
                                <TableCell ></TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {blogLists.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {row?.blogTitle}
                                    </TableCell>
                                    <TableCell >{row?.blogSubTitle}</TableCell>
                                    <TableCell >{row?.category.toString()}</TableCell>
                                    <TableCell ><Button variant="contained" color="success" onClick={() => navigate("/blogform/" + row?.id)}>Update</Button>
                                    </TableCell>

                                    <TableCell><Button variant="contained" color="error" onClick={(event) => handleClick(event, row?.id)}>Delete</Button>
                                        <Popover

                                            open={row?.id === target.id}
                                            anchorEl={target.target}
                                            onClose={handleClose}
                                            key={index}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <Box sx={{ p: 2 }}>
                                                <Typography sx={{ fontSize: 16 }} color="grey.secondary">
                                                    Are you sure?                                           </Typography>
                                                <Button variant='contained' size='small' color="success" onClick={() => onDelete(row?.id)}>Yes</Button>
                                                <Button variant='contained' size='small' onClick={() => handleClose()} sx={{ ml: 2 }} color="error">No</Button>
                                            </Box>
                                        </Popover>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> :
                    <div className="my-3" style={{ textAlign: "center" }}>
                        <h4>You haven't posted any blog yet</h4>
                        <NavLink to="/blogform"><Button variant='contained' sx={{ mt: 2 }}
                            color="primary">Post your First Blog</Button></NavLink>
                    </div>}
            </TableContainer>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loaded: state.user.loaded,
    user: state.user.user,
    hasErrors: state.user.hasErrors,
})

export default connect(mapStateToProps)(BlogList)