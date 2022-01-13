import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBar } from '@mui/material';
import { connect, useSelector, useDispatch } from 'react-redux'
import { getUserData } from '../store/actions/userActions';
import { NavLink } from 'react-router-dom';

function HomePageLayout(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserData())
    }, [dispatch])
    const user = useSelector(state => state.user.user)

    return (
        <Box>
            <AppBar position="static">

                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
                        className="heraderLogo"
                        sx={{ mr: 2, ml: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        Blog Application
                    </Typography>


                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
                        className="heraderLogo"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        Blog Application
                    </Typography>

                    <Box sx={{ flexGrow: 0, ml: "auto" }}>

                        {user ? <Typography
                            variant="h6"
                            noWrap
                            component={NavLink}
                            sx={{ flexGrow: 1, mr: 2, textDecoration: "none" }}
                            to="/blogform"
                            color="white"
                        >
                            Dashboard                        </Typography> : <Typography
                                variant="h6"
                                noWrap
                                component={NavLink}
                                sx={{ flexGrow: 1, mr: 2, textDecoration: "none" }}
                                to="/login"
                                color="white"
                            >
                            Login                        </Typography>}
                    </Box>
                </Toolbar>

            </AppBar>
            <Box component="main" >
                {props.children}
            </Box>
        </Box >
    );
}
const mapStateToProps = (state) => ({
    user: state.user
})
export default connect(mapStateToProps)(HomePageLayout)