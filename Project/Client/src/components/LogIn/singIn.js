



import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom';
import { GetCurrentUser, SignOut } from '../../actions/index';
import './SignIn.scss';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, Redirect } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#e860ff'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#e860ff'
  },
}));

//alerts

function Alert(props) {
  return <MuiAlert elevation={2} variant="filled" {...props} />;
}

//alerts


const SingIn = (props) => {

  const classes = useStyles();
  let password;
  let mail;





  // alerts

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // alerts
  useEffect(() => {

  }, [])
  const GetCurrentUser = async () => {
    await props.GetCurrentUser({ "password": password, "mail": mail });
    if (!props.CurrentUser)
      handleClick();
  }
  if (props.CurrentUser)
    return <Redirect to={{ pathname: "/Search/users" }} />;
  return (
    <>

      {/* alerts */}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">Sing In System</Alert>
      </Snackbar>

      {/* alerts */}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onKeyUp={(e) => mail = e.target.value}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onKeyUp={(e) => password = e.target.value}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={async () => {
                  await GetCurrentUser();
                }}>
                Sign In
            </Button>
              <Grid container>
                <Grid item xs>
                  <Link variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                  <Link to="SignUp">
                    Don't have an account? Sign Up
                </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
        <Grid item xs={12} sm={2} md={7} className={classes.image} />
      </Grid>
    </>


  );
}
const mapStateToProps = (state) => {

  return { CurrentUser: state.usersPart.CurrentUser, SingUp: state.usersPart.SingUp };
}
export default connect(mapStateToProps, { GetCurrentUser, SignOut })(SingIn);