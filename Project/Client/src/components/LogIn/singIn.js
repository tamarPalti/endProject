// import React from 'react'
// import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
// import { connect } from "react-redux";
// import { Link, Route } from 'react-router-dom';
// import { useEffect, useState, useRef } from "react";
// import { GetCurrentUser, SignOut } from '../../actions/index';
// import { useParams, Redirect } from 'react-router-dom';
// import axios from 'axios';
// import { propTypes } from 'react-bootstrap/esm/Image';
// import SingUp from './SingUp';
// import './SignIn.scss';
// const SingIn = (props) => {


//   let password;
//   let mail;
//   const [login, setlogin] = useState(false);
//   useEffect(() => {

//   }, [])
//   const GetCurrentUser = async () => {
//     await props.GetCurrentUser({ "password": password, "mail": mail });
//     if (!props.CurrentUser)
//       setlogin(true);
//   }
//   if (props.CurrentUser)
//     return <Redirect to={{ pathname: "/Search" }} />;


//   return (<div className="back-singIn">
//     <Segment placeholder >
//       <Grid columns={2} relaxed='very' stackable>
//         <Grid.Column>
//           <Form>
//             <Form.Input
//               icon='user'
//               iconPosition='left'
//               label='Mail'


//               placeholder='Mail'

//               onKeyUp={(e) => mail = e.target.value}
//             />
//             <Form.Input
//               icon='lock'
//               iconPosition='left'
//               label='Password'
//               type='password'
//               onKeyUp={(e) => password = e.target.value}
//             />
//             <Button content='Login' onClick={
//               async () => {
//                 await GetCurrentUser();
//               }} />
//             {login ? <p className="redError">הרשם במערכת</p> : null}
//           </Form>
//         </Grid.Column>

//         <Grid.Column verticalAlign='middle'>
//           <Link to="SignUp">
//             <Button content='Sign up' icon='signup' size='big' onClick={() => { }} />
//           </Link>
//         </Grid.Column>
//       </Grid>

//       <Divider vertical>Or</Divider>
//     </Segment>
//   </div>)

// }
// const mapStateToProps = (state) => {

//   return { CurrentUser: state.usersPart.CurrentUser, SingUp: state.usersPart.SingUp };
// }
// export default connect(mapStateToProps, { GetCurrentUser, SignOut })(SingIn);



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
    backgroundColor:'#e860ff'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#e860ff'
  },
}));

const SingIn = (props) => {
  const classes = useStyles();
  let password;
  let mail;
  const [login, setlogin] = useState(false);
  useEffect(() => {

  }, [])
  const GetCurrentUser = async () => {
    await props.GetCurrentUser({ "password": password, "mail": mail });
    if (!props.CurrentUser)
      setlogin(true);
  }
  if (props.CurrentUser)
    return <Redirect to={{ pathname: "/Search/users" }} />;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
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
            {login ? <p className="redError">הרשם במערכת</p> : null}
            <Button
              fullWidth
              variant="contained"
              // color="#e860ff"
              className={classes.submit}
              onClick={async () => {
                 await GetCurrentUser();
               }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
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
    </Grid>
  );
}
const mapStateToProps = (state) => {

  return { CurrentUser: state.usersPart.CurrentUser, SingUp: state.usersPart.SingUp };
}
export default connect(mapStateToProps, { GetCurrentUser, SignOut })(SingIn);