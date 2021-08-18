import React, { useEffect, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import business from '../../classes/business'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { Redirect } from 'react-router-dom';
import {  getAllCategories, UpdateBuisnessFunc } from '../../../util/index';
import { Multiselect } from "multiselect-react-dropdown";
import { ChangeUpdateBuisness } from '../../../actions/index';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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


function UpdateBuisness(props) {

    // עיצוב
    const classes = useStyles();

    const [currentBuisness, setcurrentBuisness] = useState(null);
    const [ifGoToLogin, setifGoToLogin] = useState(false);


    let listCategory = useRef([]);
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [ifSelect, setIfSelect] = useState(false);

    // משתנה לעדכון 
    let updateBuisness = new business();

    // טופס
    const { register, formState: { errors }, handleSubmit } = useForm();
    const name = register('name', { minLength: { value: 2, message: "Min 2" } })
    const email = register('email', { pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Email No Valid" } })
    const phone = register('phone', { pattern: { value: /0[0-9]{9}/, message: "Phone No Valid" } })
    // const listCategory = register('listCategory')
    const adress = register('adress');



    // לא לשכוח
    // this.img = "";
    // this.advertising = "";



    // פונקצית העדכון
    const onSubmit = async data => {
        updateBuisness.listCategory = listCategory.current.getSelectedItems();

        UpdateBuisnessFunc(props.updateBuisness._id, data).then(succ => {
            settypeAlert("success");
            setmasseg("Updating Success");
            handleClick();

        }).catch(error => {
            settypeAlert("error");
            setmasseg(error.response.data)

            handleClick();
        })
    }


    // onchange = (e) => {
    //     console.log(e);
    //     setCheck(e.target.checked);
    // }

    const onKeyUp = (e, type) => {
        updateBuisness[type] = e.target.value;
        e.target.value = updateBuisness[type];
        if (updateBuisness[type] == '')
            updateBuisness[type] = null;
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
        getAllCategories().then((succ) => {
            let arrName = succ.data.map((data) => data.name);
            setCategoriesArr(arrName);
        }).catch(err => {
            console.log(err);
        });

        // GetCurrentBuisness(props.updateBuisness).then(succ => {
        //     setcurrentBuisness(succ.data);
        // }).catch(error => {
        //     console.log(error);
        // });

        // return (props.IfExist(false), props.ErrorInAdd(false));

    }, [])

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeAlert}> {masseg}</Alert>
            </Snackbar>
            {ifGoToLogin ? <Redirect to={'/SingIn'} /> : props.updateBuisness && <form className={classes.form} noValidate onSubmit={handleSubmit(() => onSubmit(updateBuisness))}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                            defaultValue={props.updateBuisness.name}
                            value={props.updateBuisness.name}
                            onKeyUp={(e) => onKeyUp(e, "name")}
                            {...name}
                        />
                        <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="redColor">{message}</p>} />

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
                            defaultValue={props.updateBuisness.email}
                            onKeyUp={(e) => onKeyUp(e, "email")}
                            {...email}
                        />
                        <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="redColor">{message}</p>} />
                        {props.ifExist ? <p className="redColor">This Email Alrady Exist</p> : null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Multiselect
                            onSelect={(e) => setIfSelect(false)}
                            label="Category"
                            name="category"
                            options={categoriesArr ? categoriesArr : []}
                            isObject={false}
                            ref={listCategory} type="text"
                            selectedValues={props.updateBuisness.listCategory}
                        />
                        {ifSelect && <p className="redColor">This is required.</p>}
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
                            defaultValue={props.updateBuisness.phoneNamber}
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
                            defaultValue={props.updateBuisness.adress}
                            onKeyUp={(e) => onKeyUp(e, "adress")}
                            {...adress}
                        />
                    </Grid>

                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    Update
          </Button>
                {props.updateBuisness.name}
            </form>}
        </>

    );
}
const mapStateToProps = (state) => {

    return { updateBuisness: state.businessPart.updateBuisness };
}
export default connect(mapStateToProps, { ChangeUpdateBuisness })(UpdateBuisness);

