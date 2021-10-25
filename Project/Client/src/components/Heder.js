import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useRouteMatch, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SignOut } from '../actions';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import GroupsIcon from '@mui/icons-material/Groups';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

function PersistentDrawerRight(props) {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { pathname } = useLocation();
  const [color, setcolor] = React.useState("#0b0b2b");

  React.useEffect(() => {
    if (pathname == "/SignIn" || pathname == "/SignUp" || pathname == "/search/business" || pathname == "/search/users")
      setcolor("#ff716e");
    else
      setcolor("#0b0b2b");

  })
  return (
    <Box sx={{ display: 'flex' }}>

      <CssBaseline />

      <AppBar position="fixed" open={open}>

        <Toolbar style={{ "background-color": color, "height": "6.5em" }}>

          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Persistent drawer
          </Typography>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}

            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon style={{ "font-size": "2.5rem", "color": "white" }} />

          </IconButton>

        </Toolbar>

      </AppBar>
      <Drawer

        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}

      >
        <DrawerHeader style={{ "background-color": color, "height": "6.5em" }}>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon style={{ "font-size": "2.5rem", "color": "white" }} />}
          </IconButton>

        </DrawerHeader>

        <Divider />

        <List style={{ "line-height": "4.5" }}>

          {[{ text: 'Sign In', to: "/SignIn" },
          { text: 'Sign Up', to: '/SignUp' },
          { text: 'Search Users', to: '/search/users' },
          { text: 'Search Business', to: '/search/business' },
          { text: 'Sign Out', to: "/SignIn", action: () => props.SignOut }, { text: 'Privte Erea', to: "/PrivateArea/personalDetiles" }].map((item, index) => (

            <Link to={item.to} onClick={item.action && item.action()}>

              <ListItem button key={item.text} >

                <ListItemIcon >

                  {index  === 0 ? <LoginIcon /> : index  === 1 ?<GroupAddIcon />
                  :index  === 2 ? <PersonSearchIcon />:index  === 3?<ApartmentIcon/>
                  :index  === 4?<LogoutIcon/>:<ManageAccountsIcon/>}
                 
                </ListItemIcon>

                <ListItemText primary={item.text} />

              </ListItem>

            </Link>
          ))}

        </List>

        {/* <Divider /> */}

        {/* <List>

          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}

      </Drawer>
    </Box>
  );
}
const mapStateToProps = () => {
  return {};
}
export default connect(mapStateToProps, { SignOut })(PersistentDrawerRight); 