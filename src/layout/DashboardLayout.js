import * as React from 'react';
//Material-ui Imports
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';
import Feed from '@mui/icons-material/Feed';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
//Router imports
import { NavLink } from 'react-router-dom';
// firebase Imports
import { getAuth } from 'firebase/auth';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar(props) {
  const auth = getAuth()
  const [open, setOpen] = React.useState(true);
  const sidebarLinks = [{
    name: "Blog Form",
    href: "/blogform",
    icon: <Feed />
  }, {
    name: "Blog List",
    href: "/bloglist",
    icon: <FormatListNumberedIcon />
  }]
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const signOutUser = () => {
    auth.signOut().then(
      window.location.href = "/"
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" className="heraderLogo" noWrap component={NavLink} to="/">
            {open ? "Blog Application" : "BA"}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: '36px',

            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 0, ml: "auto" }}>
            <Button onClick={() => signOutUser()} sx={{ flexGrow: 1, color: "white" }} >Log Out</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ position: "relative" }}>
        <List sx={{ marginTop: "70px" }}>
          {sidebarLinks.map((link, index) => (

            <ListItem button key={index} component={NavLink} selected={link.href === window.location.pathname} to={link.href} >
              <ListItemIcon>
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>

          ))}
        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "70px" }} >
        {props.children}
      </Box>
    </Box >
  );
}
