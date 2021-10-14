import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { IfExist, ErrorInAdd, SignIn } from '../../actions/index';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import './SingUp.scss';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { AddUser, SendMail } from '../../util/index'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { purple } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const ariaLabel = { 'aria-label': 'description' };

const ColorButton = withStyles((theme) => ({
  root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
          backgroundColor: purple[700],
      },
  },
}))(Button);

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
    backgroundColor: '#ff716e'
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const styleblue={
  "width": "74em",
  "background-color": "#0b0b2b ",
  "margin-top": "6.7%",
  "margin-left":"-4%", 
  "height": "2em"
}
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
  const passwordemail = register('passwordemail', { required: "This is required." })
  // const passwordphone = register('passwordemail', { required: "This is required." })
  let emailToPassword = "";

  const onSubmit = data => {
    let number = localStorage.getItem("number");
    console.log(data);
    data.dateLogin = new Date();
    data.phoneNamber = [];
    data.phoneNamber.push(data.phone);
    data.ifMessege = false;
    data.adress = "";
    data.img = selectedImage;

    if (data.passwordemail == number.substring(3, 8)) {

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
    else {
      settypeAlert("error");
      setmasseg("קוד האימות שגוי");

      handleClick();
    }

    //util פונקציה מה 

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


  const sendPasswordFunc = () => {

    let number = Math.floor(Math.random() * 90000) + 10000;

    let num1 = Math.floor(Math.random() * 900) + 100;
    let num2 = Math.floor(Math.random() * 90) + 10;

    localStorage.setItem("number", num1 + "" + number + "" + num2);

    let mail = {
      toUser: emailToPassword,
      subject: "קוד אימות",
      text: `<h1>${number}</h1>`
      // ,attachments
    }
    SendMail(mail);
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

      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)} style={{ "margin-top": "31px" }} >


        {/* <input type="file" className="form-control" name="image" onChange={onFileChange} /> */}
        <Grid container spacing={2} >
          <Grid item xs={12} sm={4} style={{ "padding": "22px" }}>
            <Input placeholder="First Name"
              inputProps={ariaLabel}
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              autoFocus
              {...firstName}
            />

            <ErrorMessage errors={errors} name="firstName" render={({ message }) => <p className="redColor">{message}</p>} />

          </Grid>

          <Grid item xs={12} sm={4} style={{ "padding": "22px" }}>
            
            <Input placeholder="Last Name"
              inputProps={ariaLabel}
              variant="outlined"
              required
              fullWidth
              id="lastName"
              name="lastName"
              autoComplete="lname"
              {...lastName}
            />

            <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p className="redColor">{message}</p>} />

          </Grid>

          <Grid item xs={12} sm={4} style={{ "padding": "22px" }}>
            <Input placeholder="Password"
              inputProps={ariaLabel}
              autoComplete="password"
              name="password"
              variant="outlined"
              required
              fullWidth
              id="password"
              {...password}
            />

            <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="redColor">{message}</p>} />

          </Grid>
          <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>
            <Input placeholder="Email Address"
              inputProps={ariaLabel}
              variant="outlined"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              onKeyUp={(e) => emailToPassword = e.target.value}
              {...email}
            />
  
            <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="redColor">{message}</p>} />
      
          </Grid>

          <Grid item xs={12} sm={2} style={{ "padding": "22px" }}>

            <Button onClick={sendPasswordFunc} variant="outlined" size="small" color="primary" className={classes.margin}>
              Send
          </Button>

          </Grid>

          <Grid item xs={12} sm={4} style={{ "padding": "22px" }}>

            <Input placeholder="Password Email"
              inputProps={ariaLabel}
              variant="outlined"
              required
              fullWidth
              id="passwordemail"
              name="passwordemail"
              autoComplete="passwordemail"
              onKeyUp={(e) => emailToPassword = e.target.value}
              {...passwordemail}
            />

            <ErrorMessage errors={errors} name="passwordemail" render={({ message }) => <p className="redColor">{message}</p>} />
         
          </Grid>

          <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>

            <Input placeholder="Phone"
              inputProps={ariaLabel}
              variant="outlined"
              required
              fullWidth
              id="phone"
              name="phone"
              autoComplete="phone"
              {...phone}
            />

            <ErrorMessage errors={errors} name="phone" render={({ message }) => <p className="redColor">{message}</p>} />

          </Grid>

          <Grid item xs={12} sm={2} style={{ "padding": "22px" }}>
            <Button onClick={sendPasswordFunc} variant="outlined" size="small" color="primary" className={classes.margin}>
              Send
          </Button>
          </Grid>

          <Grid item xs={12} sm={4} style={{ "padding": "22px" }}>
            <Input placeholder="Password Phone"
              inputProps={ariaLabel}
              variant="outlined"
              required
              fullWidth
              id="passwordphone"
              name="passwordphone"
              autoComplete="passwordphone"
              onKeyUp={(e) => emailToPassword = e.target.value}
            // {...passwordphone}
            />
 
            <ErrorMessage errors={errors} name="passwordemail" render={({ message }) => <p className="redColor">{message}</p>} />
          </Grid>

          <Grid item xs={12}>

            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" onChange={(e) => onchange(e)} />}
              label="agree the conditions of use"
            />

          </Grid>

        </Grid>

        <ColorButton
          variant="contained"
          color="primary"
          style={{ "background-color": "#fb7375","border-radius": "0px 0px 0px 0px","width": "20%",
          "margin-left": "78%",
          "margin-top":" 3%", 'color':'white'}}
          className={classes.margin + " "+classes.submit}
          fullWidth
          disabled={!check}
        >

        Continue

        </ColorButton>

        <ColorButton
          variant="contained"
          color="primary"
          style={{ "background-color": "#0b0b2b","border-radius": "0px 0px 0px 0px","width": "20%",
          "margin-left": "57%",
          "margin-top":" -7.2%",
           'color':'white'}}
          className={classes.margin + " "+classes.submit}
          type="submit"
          fullWidth
          disabled={!check}
        >
             Sign Up
         
        </ColorButton>

        <Grid container justifyContent="flex-end">

          <Grid item>

            <Link to="/SignIn">

              Already have an account? Sign in

              </Link>

          </Grid>

        </Grid>
            <div style={styleblue}> </div>

      </form>
         
    </>

  );
}
const mapStateToProps = (state) => {

  return { ifExist: state.usersPart.IfExist, errorInAdd: state.usersPart.ErrorInAdd };
}
export default connect(mapStateToProps, { IfExist, ErrorInAdd, SignIn })(BasicDetails);