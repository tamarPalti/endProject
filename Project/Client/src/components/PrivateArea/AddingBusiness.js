import React, { useEffect, useState, useRef } from 'react';
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
import business from '../classes/business'
import user from '../classes/user';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import '../LogIn/SingUp.scss';
import { Link } from 'react-router-dom';
import { IfExist, ErrorInAdd } from '../../actions/index';
import Paper from '@material-ui/core/Paper';
import { Multiselect } from "multiselect-react-dropdown";
import axios from 'axios';
//לא לשכוח
//   img
//   advertising


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

function AddingBusiness(props) {
    const classes = useStyles();

    const [check, setCheck] = useState(false);
    let currentUser = new user();
    let Business=new business();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const name = register('name', { required: "This is required.", minLength: { value: 2, message: "Min 2" }, maxLength: { value: 11, message: "Max 11" } })
    const adress = register('adress', { required: "This is required.", minLength: { value: 2, message: "Min 2" }, maxLength: { value: 10, message: "Max 10" } })
    const email = register('email', { required: "This is required.", pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Email No Valid" } })
    const phone = register('phone', { required: "This is required.", pattern: { value: /0[0-9]{9}/, message: "Phone No Valid" } })
    const category = register('category', { minLength: { value: 1, message: "hhhhh" } })
    const AddBusiness =async (business) => {
        axios.post("http://localhost:4000/business", business).then((succ) => {
            console.log(succ.data);
        }).catch(ee => {
            console.log(ee.massege);

        });
    }
    
    const [ifSelect, setIfSelect] = useState(false);
    const onSubmit = data => {
        if (listCategory.current.getSelectedItems().length == 0)
            setIfSelect(true);
        else {
            Business.phoneNamber=[];
            Business.phoneNamber.push(data.phone);
            Business.userId = localStorage.getItem("currentUserId");
            Business.listCategory = listCategory.current.getSelectedItems();
            Business.name=data.name;
            Business.email=data.email;
            Business.adress=data.adress;
            AddBusiness(Business);
        }
    }
    let listCategory = useRef([]);
    const [categoriesArr, setCategoriesArr] = useState([]);

    const getAllCategories = () => {
        axios.get("http://localhost:4000/categories").then(scss => {
            let arrName = scss.data.map((data) => data.name);
            setCategoriesArr(arrName);
        });
    }
    onchange = (e) => {
        console.log(e);
        setCheck(e.target.checked);

    }
    useEffect(() => {
        getAllCategories();
        // return (props.IfExist(false), props.ErrorInAdd(false))
    }, [])

    return (
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="name"
                        autoFocus
                        {...name}
                    />
                    <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="redColor">{message}</p>} />

                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="adress"
                        label="Address"
                        name="adress"
                        autoComplete="lname"
                        {...adress}
                    />
                    <ErrorMessage errors={errors} name="adress" render={({ message }) => <p className="redColor">{message}</p>} />

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
                    // {...category}
                    />
                    {ifSelect && <p className="redColor">This is required.</p>}


                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="phone"
                        label="Phone Namber"
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
    );
}
const mapStateToProps = (state) => {

    return {};
}
export default connect(mapStateToProps, {})(AddingBusiness);