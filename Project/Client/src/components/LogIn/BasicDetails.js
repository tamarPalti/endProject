import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { IfExist, ErrorInAdd, SignIn } from '../../actions/index';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import './SingUp.scss';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { AddUser } from '../../util/index'

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



function BasicDetails(props) {

  const classes = useStyles();

  const [check, setCheck] = useState(false);


  const { register, formState: { errors }, handleSubmit } = useForm();
  const firstName = register('firstName', { required: "This is required.", minLength: { value: 2, message: "Min 2" }, maxLength: { value: 11, message: "Max 11" } })
  const lastName = register('lastName', { required: "This is required.", minLength: { value: 2, message: "Min 2" }, maxLength: { value: 10, message: "Max 10" } })
  const email = register('email', { required: "This is required.", pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Email No Valid" } })
  const phone = register('phone', { required: "This is required.", pattern: { value: /0[0-9]{9}/, message: "Phone No Valid" } })
  const password = register('password', { required: "This is required.", minLength: { value: 5, message: "Min 5" }, maxLength: { value: 5, message: "Max 5" }, pattern: { value: /[0-9a-zA-Z]{5}/, message: "Make sure it's at least 5 characters OR characters including a number , a lowercase letter and a upperrcase letter" } })

  const onSubmit = data => {


    console.log(data);
    data.dateLogin = new Date();
    data.phoneNamber = [];
    data.phoneNamber.push(data.phone);
    data.ifMessege = false;
    data.adress = "";
    data.img = selectedImage;


    //util פונקציה מה 
    AddUser(data).then((succ) => {
      console.log(succ.data);

      props.SignIn(succ.data);
      props.IfExist(false);
      props.ErrorInAdd(false);
      settypeAlert("success");
      setmasseg("Adding Success");
      handleClick();

    }).catch(ee => {
      console.log(ee.massege);
      if (ee.response.status == 500) {
        props.IfExist(true);
        props.ErrorInAdd(false);
      }

      else {
        props.ErrorInAdd(true);
        props.IfExist(false);
      }
      settypeAlert("error");
      setmasseg(ee.response.data)

      handleClick();
    });
  }

  onchange = (e) => {
    console.log(e);
    setCheck(e.target.checked);

  }

  // alerts

  const [open, setOpen] = React.useState(false);

  const [typeAlert, settypeAlert] = React.useState("");
  const [masseg, setmasseg] = React.useState("");


  const [selectedImage, setselectedImage] = useState();


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

  const onFileChange = (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);

    fileReader.onload = (event) => {
      setselectedImage(event.target.result)

    }
  }

  useEffect(() => {

    return (props.IfExist(false), props.ErrorInAdd(false))

  }, [])

  return (
    <>
      {/* alerts */}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeAlert}> {masseg}</Alert>
      </Snackbar>

      {/* alerts */}

      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>


        <input type="file" className="form-control" name="image" onChange={onFileChange} />


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
              {...email}
            />
            <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="redColor">{message}</p>} />
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
              {...phone}
            />
            <ErrorMessage errors={errors} name="phone" render={({ message }) => <p className="redColor">{message}</p>} />

          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" onChange={(e) => onchange(e)} />}
              label="agree the conditions of use"
            />
          </Grid>
        </Grid>
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


    </>

  );
}
const mapStateToProps = (state) => {

  return { ifExist: state.usersPart.IfExist, errorInAdd: state.usersPart.ErrorInAdd };
}
export default connect(mapStateToProps, { IfExist, ErrorInAdd, SignIn })(BasicDetails);