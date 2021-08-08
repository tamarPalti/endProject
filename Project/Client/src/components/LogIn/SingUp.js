// import 'react-bootstrap';
// import { GetAllUsers, SaveResultUsers, SearchUsers, DeleteResultUser, ChangeColorFirstName, ChangeColorLastName } from '../../actions/index';
// import user from '../classes/user';
// import { useEffect, useState, useRef } from 'react';
// import { connect } from "react-redux";
// import './SingUp.scss';
// const SingUp = (props) => {

//     let firstName = useRef();
//     let lastName = useRef();
//     let phoneNamber = useRef();
//     let email = useRef();
//     let adress = useRef();
//     return (<div className="back-singUp">
//         <div class="ui small form">
//             <div class="two fields">
//                 <div class="field">
//                     <label>First Name</label>
//                     <input placeholder="First Name" type="text" />
//                 </div>
//                 <div class="field">
//                     <label>Last Name</label>
//                     <input placeholder="Last Name" type="text" />
//                 </div>
//             </div>
//             <div class="two fields">
//                 <div class="field">
//                     <label>Phone</label>
//                     <input placeholder="Phone" type="text" />
//                 </div>
//                 <div class="field">
//                     <label>Mail</label>
//                     <input placeholder="Mail" type="text" />
//                 </div>
//             </div>
//             <div class="two fields">
//                 <div class="field">
//                     <label>Address</label>
//                     <input placeholder="Address" type="text" />
//                 </div>
//                 <div class="field">
//                     <label>Image</label>
//                     <input placeholder="Image" type="text" />
//                 </div>
//             </div>
//             <div class="ui submit button">Submit</div>
//         </div>
//     </div>);
// }
// const mapStateToProps = (state) => {

//     return {};
// }
// export default connect(mapStateToProps, {})(SingUp);







import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#e860ff'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#e860ff'

  },
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="password"
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}