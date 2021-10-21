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
import { getAllCategories, UpdateBuisnessFunc } from '../../../util/index';
import { Multiselect } from "multiselect-react-dropdown";
import { ChangeUpdateBuisness } from '../../../actions/index';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Input from '@mui/material/Input';


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
        backgroundImage: "linear-gradient(132deg, black 0%, #ff716e 0%, #0b0b2b 80%)"
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
            props.GetAllBuisnessOfUser();

        }).catch(error => {

            settypeAlert("error");
            setmasseg(error.response.data)
            handleClick();

        });
    }




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
        
    }, [])

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeAlert}> {masseg}</Alert>
            </Snackbar>
            {props.updateBuisness && props.updateBuisness._id == props.id && <form className={classes.form} noValidate onSubmit={handleSubmit(() => onSubmit(updateBuisness))}>
<Grid style={{"margin-left": "63%",
    "width": "153%",
    "margin-top": "3%",    "position": "absolute"}}>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>
                        <Input
                            autoComplete="fname"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            defaultValue={props.updateBuisness.name}
                            onKeyUp={(e) => onKeyUp(e, "name")}
                            {...name}
                        />
                        <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="redColor">{message}</p>} />

                    </Grid>

                    <Grid item xs={12} style={{ "padding": "22px" }}>
                        <Input
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            defaultValue={props.updateBuisness.email}
                            onKeyUp={(e) => onKeyUp(e, "email")}
                            {...email}
                        />
                        <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="redColor">{message}</p>} />
                        {props.ifExist ? <p className="redColor">This Email Alrady Exist</p> : null}
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>
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
                    <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>
                        <Input
                            variant="outlined"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            autoComplete="phone"
                            defaultValue={props.updateBuisness.phoneNamber}
                            onKeyUp={(e) => onKeyUp(e, "phoneNamber")}
                           
                        />
                        <ErrorMessage errors={errors} name="phone" render={({ message }) => <p className="redColor">{message}</p>} />

                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>
                        <Input
                            autoComplete="fname"
                            name="address"
                            variant="outlined"
                            required
                            fullWidth
                            id="address"
                            label="Address"
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
         </Grid>
            </form>}
        </>

    );
}
const mapStateToProps = (state) => {

    return { updateBuisness: state.businessPart.updateBuisness };
}
export default connect(mapStateToProps, { ChangeUpdateBuisness })(UpdateBuisness);

