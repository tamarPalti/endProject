import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { AddUser } from '../../actions/index';
import user from '../classes/user';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import '../LogIn/SingUp.scss';
import { IfExist, ErrorInAdd } from '../../actions/index';
import axios from 'axios';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { GetCurrentUser } from '../../util/index';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { UpdateUser, GetCurrentUserById, UpdateStatusTask } from '../../util/index';


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


function UpdatePersonalDetails(props) {

    // עיצוב
    const classes = useStyles();

    const [currentUser, setCurrentUser] = useState(null);
    const [ifGoToLogin, setifGoToLogin] = useState(false);






    const { id,idTask } = useParams();


    // משתנה לעדכון 
    let updateUser = new user();
    updateUser.firstName = null;
    updateUser.lastName = null;
    updateUser.password = null;
    updateUser.phoneNamber = null;
    updateUser.adress = null;


    // טופס
    const { register, formState: { errors }, handleSubmit } = useForm();
    const firstName = register('firstName', { minLength: { value: 2, message: "Min 2" }, maxLength: { value: 11, message: "Max 11" } })
    const lastName = register('lastName', { minLength: { value: 2, message: "Min 2" }, maxLength: { value: 10, message: "Max 10" } })
    const email = register('email', { pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Email No Valid" } })
    const phone = register('phone', { pattern: { value: /0[0-9]{9}/, message: "Phone No Valid" } })
    const password = register('password', { minLength: { value: 5, message: "Min 5" }, maxLength: { value: 5, message: "Max 5" }, pattern: { value: /[0-9a-zA-Z]{5}/, message: "Make sure it's at least 5 characters OR characters including a number , a lowercase letter and a upperrcase letter" } })
    const address = register('address');


    // פונקצית העדכון
    const onSubmit = async data => {

        data.ifMessege = data.ifMessege === "" ? currentUser.ifMessege : data.ifMessege;
        if (updateUser.firstName === "" || updateUser.lastName === "" || updateUser.adress === "" || updateUser.phoneNamber === "" || updateUser.password === "") {
            settypeAlert("error");
            setmasseg("ALL INPUT IS REQUIRED");
            handleClick();
        }
        else {
            UpdateUser(id ? id : localStorage.getItem("currentUserId"), data).then(succ => {
                if (idTask && id)
                    UpdateStatusTask(idTask, true);
                settypeAlert("success");
                setmasseg("Updating Success");
                handleClick();

            }).catch(error => {

                settypeAlert("error");
                setmasseg(error.response.data)
                handleClick();

            });
        }


    }



    const onKeyUp = (e, type) => {

        updateUser[type] = e.target.value;
        // e.target.value = updateUser[type];
        // if (updateUser[type] == '')
        //     updateUser[type] = null;
    }

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

        if (id) {
            GetCurrentUserById(id).then(data => {
                setCurrentUser(data.data);

            }).catch(() => {

            });
           

        }


        else
            // שליפת המשתמש הנוכחי
            GetCurrentUser().then(data => {
                setCurrentUser(data.data);

            }).catch(() => {

            });

        return (props.IfExist(false), props.ErrorInAdd(false));

    }, [props.idUserUpdate])

    return (
        <>

            {/* alerts */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeAlert}> {masseg}</Alert>
            </Snackbar>
            {/* alerts */}

            { currentUser && <form className={classes.form} noValidate onSubmit={handleSubmit(() => onSubmit(updateUser))}>
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
                            defaultValue={currentUser.firstName}
                            onKeyUp={(e) => onKeyUp(e, "firstName")}
                            {...firstName}
                        // onLoad={() => updateUser.firstName = currentUser.firstName}
                        />
                        <p></p>
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
                            defaultValue={currentUser.lastName}
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
                            defaultValue={currentUser.email}
                            onKeyUp={(e) => onKeyUp(e, "email")}
                            {...email}
                            disabled="true"
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
                            defaultValue={currentUser.password}
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
                            defaultValue={currentUser.phoneNamber}
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
                            defaultValue={currentUser.adress}
                            onKeyUp={(e) => onKeyUp(e, "adress")}
                            {...address}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked={currentUser.ifMessege}
                                color="primary" onClick={(e) => {
                                    updateUser.ifMessege = e.target.checked
                                }} />}
                            label="I want to be notified if they searched for me"
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
                >
                    Update
          </Button>

            </form>}
        </>

    );
}
const mapStateToProps = (state) => {

    // ;
    return {
        ifExist: state.usersPart.IfExist, errorInAdd: state.usersPart.ErrorInAdd,
        idUserUpdate: state.usersPart.IdUserManagerUpdate
    };
}
export default connect(mapStateToProps, { AddUser, IfExist, ErrorInAdd })(UpdatePersonalDetails);
