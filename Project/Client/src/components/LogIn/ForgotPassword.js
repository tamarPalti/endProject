



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
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { GetCurrentUserByPaaswordAndMail, CheckManager, SendPasswordIfExist } from '../../util/index';
import { SignIn as SignInFunc } from '../../actions/index';
import Input from '@mui/material/Input';
import './ForgotPassword.scss';

const ariaLabel = { 'aria-label': 'description' };

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
        backgroundColor: '#e860ff'
    },
}));

const marginToGrid={
    "margin-top": "33px"
  }
const styleBlue={
  "width": "106em",
  "background-color": "#0b0b2b ",
  "margin-top": "49.8%",
  "margin-left":"-6%", 
  "height": "2em"
}
//alerts

function Alert(props) {
    return <MuiAlert elevation={2} variant="filled" {...props} />;
}

//alerts


const ForgotPassword = (props) => {

    const classes = useStyles();

    let mail;

    const [ifManager, setifManager] = useState(false);
    const [ifNoGoToLogin, setifNoGoToLogin] = useState(false);

    // alerts

    const [open, setOpen] = React.useState(false);

    const [typeAlert, settypeAlert] = React.useState("");
    const [masseg, setmasseg] = React.useState("");

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



        SendPasswordIfExist(mail).then(async succ => {
            settypeAlert("success");
            setmasseg("הסיסמא נשלחה בהצלחה");
            handleClick();

        }).catch(error => {
            settypeAlert("error");
            setmasseg(error.response.data)
            handleClick();
        });



    }

    if (ifNoGoToLogin)
        return ifManager ? <Redirect to={'/Manager'} /> : <Redirect to={{ pathname: "/Search/users" }} />;

    return (
        <>

            {/* alerts */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeAlert}> {masseg}</Alert>
            </Snackbar>
            {/* alerts */}
            <Grid container component="main" className={classes.root} >
                <CssBaseline />

                <Grid item xs={12} sm={8} md={5} component={Paper}style={marginToGrid} elevation={6} square>

                <div className="backrundForgot"></div>


                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon style={{ "font-size": "2.5rem" }}/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Enter your email
                        </Typography>
                        <form className={classes.form} noValidate>
                            <Grid item xs={12} sm={8} style={{ "padding": "22px","max-width": "113.666667%"}}>
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

                            <Button
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                                style={{"border-radius": "0px 0px 0px 0px","backgroundColor":"#ff716e"}}
                                onClick={async () => {
                                    await GetCurrentUser();
                                }}>
                               
                                Send
                            </Button>

                            <Grid container>

                                <Grid item>

                                    <Link to="/SignIn">
                                        Already have an account? Sign in
                                    </Link>

                                </Grid>

                            </Grid>

                            <div style={styleBlue}> </div>

                        </form>

                    </div>

                </Grid>

                <Grid item xs={12} sm={2} md={7} className={classes.image + " opcityandimg"} />
                
            </Grid>
        </>


    );
}
const mapStateToProps = (state) => {

    return { CurrentUser: state.usersPart.CurrentUser, SingUp: state.usersPart.SingUp };
}
export default connect(mapStateToProps, { GetCurrentUser, SignOut, SignInFunc })(ForgotPassword);