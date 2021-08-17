import React, { useEffect, useState } from 'react';
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
import '../LogIn/SingUp.scss';
import { Link } from 'react-router-dom';
import { IfExist, ErrorInAdd } from '../../actions/index';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input'
import axios from 'axios';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
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

function UpdatePersonalDetails(props) {

    // עיצוב
    const classes = useStyles();

    const [check, setCheck] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [ifGoToLogin, setifGoToLogin] = useState(false);

    // משתנה לעדכון 
    let updateUser = new user();

    // טופס
    const { register, formState: { errors }, handleSubmit } = useForm();
    const firstName = register('firstName', { minLength: { value: 2, message: "Min 2" }, maxLength: { value: 11, message: "Max 11" } })
    const lastName = register('lastName', { minLength: { value: 2, message: "Min 2" }, maxLength: { value: 10, message: "Max 10" } })
    const email = register('email', { pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Email No Valid" } })
    const phone = register('phone', { pattern: { value: /0[0-9]{9}/, message: "Phone No Valid" } })
    const password = register('password', { minLength: { value: 5, message: "Min 5" }, maxLength: { value: 5, message: "Max 5" }, pattern: { value: /[0-9a-zA-Z]{5}/, message: "Make sure it's at least 5 characters OR characters including a number , a lowercase letter and a upperrcase letter" } })
    const address = register('address');


    // שליפת המשתמש הנוכחי
    const GetCuccentUser = async () => {
        axios.get(`http://localhost:4000/users/${localStorage.getItem("currentUserId")}`).then(data => {
            setCurrentUser(data.data);
        }).catch(() => {
            setifGoToLogin(true);
        });
    }

    // פונקצית העדכון
    const onSubmit = async data => {
        await axios.put(`http://localhost:4000/users/${localStorage.getItem("currentUserId")}`, data);
    }


    onchange = (e) => {
        console.log(e);
        setCheck(e.target.checked);
    }

   const onFocus = (e, type) => {
        if (updateUser[type] == '')
            e.target.value = currentUser[type];

        else {
            if (updateUser[type] == null)

                e.target.value = '';
            else
                e.target.value = updateUser[type];
        }
    }

    const onKeyUp=(e,type)=>{
        updateUser[type] = e.target.value;
        e.target.value = updateUser[type];
        if (updateUser[type] == '')
            updateUser[type] = null;
    }


    
    useEffect(() => {
        GetCuccentUser();
        return (props.IfExist(false), props.ErrorInAdd(false));

    }, [])

    return (
        ifGoToLogin ? <Redirect to={'/SingIn'} /> : currentUser && <form className={classes.form} noValidate onSubmit={handleSubmit(() => onSubmit(updateUser))}>
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
                        onFocus={(e) =>  onFocus(e, "firstName")}
                        onKeyUp={(e) => onKeyUp(e, "firstName")}
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
                        autoFocus
                        onFocus={(e) =>  onFocus(e, "lastName")}
                        onKeyUp={(e) => onKeyUp(e, "lastName")}
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
                        autoFocus
                        onFocus={(e) =>  onFocus(e, "email")}
                        onKeyUp={(e) => onKeyUp(e, "email")}
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
                        onFocus={(e) =>  onFocus(e, "password")}
                        onKeyUp={(e) => onKeyUp(e, "password")}
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
                        autoFocus
                        onFocus={(e) =>  onFocus(e, "phoneNamber")}
                        onKeyUp={(e) => onKeyUp(e, "phoneNamber")}
                        {...phone}
                    />
                    <ErrorMessage errors={errors} name="phone" render={({ message }) => <p className="redColor">{message}</p>} />

                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="address"
                        variant="outlined"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        autoFocus
                        onFocus={(e) =>  onFocus(e, "adress")}
                        onKeyUp={(e) => onKeyUp(e, "adress")}
                        {...address}
                    />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <Input
                        variant="outlined"
                        required
                        type="file"
                        fullWidth
                        id="image"
                        label="Image"
                        name="image"
                        autoComplete="lname"
                        autoFocus
                        onFocus={(e) =>  onFocus(e, "img")}
                        onKeyUp={(e) => onKeyUp(e, "img")}
                    />
                </Grid> */}
            </Grid>
            {props.errorInAdd ? <p className="redColor">Error System</p> : null}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Update
          </Button>

        </form>
    );
}
const mapStateToProps = (state) => {

    return { ifExist: state.usersPart.IfExist, errorInAdd: state.usersPart.ErrorInAdd };
}
export default connect(mapStateToProps, { AddUser, IfExist, ErrorInAdd })(UpdatePersonalDetails);

