import { connect } from "react-redux";
import { Link } from 'react-router-dom';
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
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { GetCurrentUserByPaaswordAndMail, CheckManager } from '../../util/index';
import { SignIn as SignInFunc } from '../../actions/index';
import Input from '@mui/material/Input';
import { purple } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';

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
    // backgroundImage:'url(./img/back.png)'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#ff716e',
    width: "65px",
    height: "65px",
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

const marginToGrid = {
  "margin-top": "33px",
  "margin-left": "120px"
}
const marginOfInput = {
  "margin-top": "auto",
  "margin-right": "281px",
  "margin-bottom": "0px",
  "margin-left": "0px"
}
const styleBlue = {
  "width": "106em",
  "background-color": "#0b0b2b ",
  "margin-top": "11%",
  "margin-left": "-4%",
  "height": "2em"
}
const styleButton = {
  "background-color": "#fb7375",
  "border-radius": "0px 0px 0px 0px",
  "width": "20%",
  "margin-left": "75%",
  "margin-top": " 19.2%",
  'color': 'white'
}
const styleFoeget = {
  "margin-top": "-26px",
  "margin-right": "-2px",
  "margin-bottom": "-13px",
  "margin-left": "20px",
}
const colorLoder = {
  "background-color": "#fb7375",
  "color": "#fb7375"
}
//alerts

function Alert(props) {
  return <MuiAlert elevation={2} variant="filled" {...props} />;
}

//alerts


const SingIn = (props) => {

  const classes = useStyles();
  let password;
  let mail;

  const [ifManager, setifManager] = useState(false);
  const [ifNoGoToLogin, setifNoGoToLogin] = useState(false);



  const [CircularProgresState, setCircularProgresState] = useState(false);

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

    setCircularProgresState(true);

    GetCurrentUserByPaaswordAndMail(password, mail).then(async succ => {

      await props.SignInFunc(succ.data);

      let if404 = await CheckManager(succ.data.email, succ.data.password);
      
      setTimeout(() => {
        if (if404) {
          setifManager(true);
        }
        setifNoGoToLogin(true);
        setCircularProgresState(false);
        window.location.reload();
      }, 5000);


    }).catch(error => {
      setCircularProgresState(false);
      handleClick();

    });



  }

  if (!CircularProgresState && ifNoGoToLogin)
    return ifManager ? <Redirect to={'/Manager'} /> : <Redirect to={{ pathname: "/Search/users" }} />;

  return (
    // CircularProgresState ? <CircularProgress style={{ "width": "40px", "height": "40px", "margin-top": "23%", "margin-left": " 48%" }} /> :

    CircularProgresState ? <Stack sx={{ width: '100%', color: 'grey.500' }} style={{ "margin-top": "23%" }} spacing={2}>
      <LinearProgress style={colorLoder} />
      <LinearProgress style={colorLoder} />
      <LinearProgress style={colorLoder} />
    </Stack> :

      <>

        {/* alerts */}

        <Snackbar
          open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">Sing In System</Alert>
        </Snackbar>

        {/* alerts */}
        <Grid container component="main" className={classes.root}>

          <CssBaseline />

          <Grid item xs={12} sm={4} md={7} component={Paper} elevation={6} square >

            <div className="backrund"></div>

            <div className={classes.paper}>

              <Avatar className={classes.avatar}>
                <LockOutlinedIcon style={{ "font-size": "2.5rem" }} />
              </Avatar>

              <Typography component="h1" variant="h5">
                Sign in
            </Typography>

              <form className={classes.form} noValidate>

                <Grid container spacing={2} style={marginToGrid}>

                  <Grid item xs={12} sm={8} style={{ "padding": "22px" }}>

                    <Input placeholder="Email Address"
                      inputProps={ariaLabel}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onKeyUp={(e) => mail = e.target.value}
                    />

                  </Grid>

                  <Grid item xs={12} sm={8} style={{ "padding": "22px" }}>

                    <Input placeholder="Password"
                      inputProps={ariaLabel}
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

                  </Grid>
                  <Grid container spacing={1} style={styleFoeget}>

                    <Grid item xs={10} sm={3} >

                      <Link variant="body2" to="ForgotPassword" style={{ "margin-right": "34%" }}>
                        Forgot password?
                  </Link>

                    </Grid>

                    <Grid item xs={10} sm={7} style={{ "margin-left": " 16%" }}>
                      <Link to="SignUp" style={marginOfInput}>
                        Don't have an account? Sign Up
                </Link>

                    </Grid>
                  </Grid>
                </Grid>

                <ColorButton
                  variant="contained"
                  color="primary"
                  style={styleButton}
                  className={classes.margin + " " + classes.submit}
                  fullWidth
                  onClick={async () => {
                    await GetCurrentUser();
                    // setTimeout(() => window.location.reload(),4500); 
                  }}>
                  Sign In

                  </ColorButton>





                <div style={styleBlue}> </div>

              </form>

            </div>
          </Grid>

          <Grid item xs={12} sm={1} md={5} className={classes.image + " opcityandimg"} />

        </Grid>
      </>


  );
}
const mapStateToProps = (state) => {

  return { CurrentUser: state.usersPart.CurrentUser, SingUp: state.usersPart.SingUp };
}
export default connect(mapStateToProps, { GetCurrentUser, SignOut, SignInFunc })(SingIn);