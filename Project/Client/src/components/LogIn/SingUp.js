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







import React, { useEffect,useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { AddUser } from '../../actions/index';
import user from '../classes/user';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import './SingUp.scss';
import { Link } from 'react-router-dom';
import { IfExist, ErrorInAdd } from '../../actions/index';

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

function SignUp(props) {
  const classes = useStyles();

const [check, setCheck] = useState(true);

  let currentUser = new user();

  const { register, formState: { errors }, handleSubmit } = useForm();
  const firstName = register('firstName', { required: "This is required.", minLength: { value: 2, message: "Min 2" }, maxLength: { value: 11, message: "Max 11" } })
  const lastName = register('lastName', { required: "This is required.", minLength: { value: 2, message: "Min 2" }, maxLength: { value: 10, message: "Max 10" } })
  const email = register('email', { required: "This is required.", pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Email No Valid" } })
  const phone = register('phone', { required: "This is required.", pattern: { value: /0[0-9]{9}/, message: "Phone No Valid" } })
  const password = register('password', { required: "This is required.", minLength: { value: 5, message: "Min 5" }, maxLength: { value: 5, message: "Max 5" }, pattern: { value: /[0-9a-zA-Z]{5}/, message: "Make sure it's at least 5 characters OR characters including a number , a lowercase letter and a upperrcase letter" } })

  const onSubmit = data => {
    console.log(data);
    currentUser.dateLogin = new Date();
    currentUser.phoneNamber = [];
    currentUser.phoneNamber.push(data.phone);
    currentUser.ifMessege = false;
    props.AddUser(currentUser);
  }
  onchange = (e) => {
    console.log(e);
    setCheck(e.target.checked);
     
  }
  useEffect(() => {
    return (props.IfExist(false), props.ErrorInAdd(false))
  }, [])

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
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
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
                onKeyUp={(e) => currentUser.firstName = e.target.value}
                {...firstName}
              />
              <ErrorMessage errors={errors} name="firstName" render={({ message }) => <p className="redColor">{message}</p>} />

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
                onKeyUp={(e) => currentUser.lastName = e.target.value}
                {...lastName}
              />
              <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p className="redColor">{message}</p>} />

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
                onKeyUp={(e) => currentUser.email = e.target.value}
                {...email}
              />
              <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="redColor">{message}</p>} />
              {props.ifExist ? <p className="redColor">This Email Alrady Exist</p> : null}
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
                onKeyUp={(e) => currentUser.password = e.target.value}
                {...password}
              />
              <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="redColor">{message}</p>} />

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
                onKeyUp={(e) => currentUser.phoneNamber = e.target.value}
                {...phone}
              />
              <ErrorMessage errors={errors} name="phone" render={({ message }) => <p className="redColor">{message}</p>} />

            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails"  color="primary" onChange={(e) => onchange(e)} />}
                label="agree the conditions of use"
              />
            </Grid>
          </Grid>
          {props.errorInAdd ? <p className="redColor">Error System</p> : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!check}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/SignIn">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}
const mapStateToProps = (state) => {

  return { ifExist: state.usersPart.IfExist, errorInAdd: state.usersPart.ErrorInAdd };
}
export default connect(mapStateToProps, { AddUser, IfExist, ErrorInAdd })(SignUp);