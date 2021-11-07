import React, { useEffect, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import business from '../classes/business'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import '../LogIn/SingUp.scss';
import { Multiselect } from "multiselect-react-dropdown";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { AddBusiness, getAllCategories, SendMail, GetAllBuisnessOfUser } from '../../util/index';
import Input from '@mui/material/Input';
import person from '../search/img/person.png';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { IconButton, Icon } from '@material-ui/core';
const ariaLabel = { 'aria-label': 'description' };

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


//alerts

function Alert(props) {
    return <MuiAlert elevation={2} variant="filled" {...props} />;
}

//alerts


function AddingBusiness(props) {

    const classes = useStyles();




    //validation
    const { register, formState: { errors }, handleSubmit } = useForm();
    const name = register('name', { required: "This is required.", minLength: { value: 2, message: "Min 2" }, maxLength: { value: 11, message: "Max 11" } })
    const adress = register('adress', { required: "This is required." })
    const email = register('email', { required: "This is required.", pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Email No Valid" } })
    const phone = register('phone', { required: "This is required.", pattern: { value: /0[0-9]{9}/, message: "Phone No Valid" } })
    const category = register('category', { minLength: { value: 1, message: "hhhhh" } })

    const passwordemail = register('passwordemail', { required: "This is required." })
    // const passwordphone = register('passwordemail', { required: "This is required." })
    let emailToPassword = "";


    //validation


    // function add buissnes

    const AddBusinessFunc = async (business) => {

        AddBusiness(business).then((succ) => {
            console.log(succ.data);

            settypeAlert("success");
            setmasseg("Adding Success");
            handleClick();

        }).catch(ee => {

            console.log(ee.massege);

            settypeAlert("error");
            setmasseg(ee.response.data)

            handleClick();

        });
    }

    // function add buissnes

    //img

    const [imsState, setimsState] = useState();
    const [imsStateToShow, setimsStateToShow] = useState();
    const [listBuisness, setlistBuisness] = React.useState([]);
    const styleItem = {
        "padding": "0px",
        "top": "42px",
        "margin-left": "40%",
        "position": "relative"

    }
    const styleLable = {
        "width": "88.6%",
        "height": "30%",
        "margin-top": "-26%"
    }
    const styleInputImg = {
        "border-radius": "50%",
        "height": "3em",
        "width": "14%",
        "margin-left": "3%",
        "margin-bottom": "18%",
        "position": "relative"
    }
    const styleImg = {
        "width": "60%",
        "border-radius": "50%",
        "height": "13em",
        "margin-top": "-105%",
        "z-index": "10"

    }

    const onchangeImg = (e) => {

        if (e.target.files && e.target.files.length > 0) {
            setimsState(e.target.files[0]);
            console.log(e.target.files[0]);
            setimsStateToShow(e.target.value);
            e.preventDefault();
            const reader = new FileReader();
            const file = e.target.files[0];
            reader.onloadend = () => {
                setimsStateToShow(reader.result);
            }
            reader.readAsDataURL(file);
        }

    }

    //img

    const GetCurrentBuisnessFunc = () => {

         GetAllBuisnessOfUser().then(data => {
            console.log(data.data);
            setlistBuisness(data.data);
            // return data.data;

        }).catch(error => {
            console.log(error);

        });

    }
    //function submit

    const onSubmit =  data => {

        if (listCategory.current.getSelectedItems().length == 0)
            setIfSelect(true);
        else {
            let Business = new FormData();
          
            if (listBuisness.length < 7) {
                let arr = [];
                arr.push(data.phone);
                Business.append("phoneNamber", arr);
                Business.append("userId", localStorage.getItem("currentUserId"));
                Business.append("listCategory", listCategory.current.getSelectedItems());
                Business.append("name", data.name);
                Business.append("email", data.email);
                Business.append("adress", data.adress);
                Business.append("img", imsState);

                AddBusinessFunc(Business);
            }
            else
            {
                settypeAlert("error");
            setmasseg("לא ניתן להוסיף יותר מ- 7 עסקים")

            handleClick();
            }
           
        }
    }

    //function submit

    //ctegory
    let listCategory = useRef([]);
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [ifSelect, setIfSelect] = useState(false);

    const [check, setCheck] = useState(false);

    onchange = (e) => {
        console.log(e);
        setCheck(e.target.checked);
    }

    useEffect(() => {
        GetCurrentBuisnessFunc();
        getAllCategories().then(scss => {
            let arrName = scss.data.map((data) => data.name);
            setCategoriesArr(arrName);
        });

    }, [])


    // validation password to mail

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

    // validation password to mail


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




    return (<>
        {/* alerts */}

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={typeAlert}> {masseg}</Alert>
        </Snackbar>

        {/* alerts */}

        {/* form */}

        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>


                <Grid item xs={12} sm={4} style={styleItem}>

                    <label htmlFor="photo-upload" className="custom-file-upload fas" style={styleLable}>
                        <input type="file" className="form-control"
                            accept="image/png, image/jpeg"
                            name="image" onChange={(e) => onchangeImg(e)}
                            style={styleInputImg}

                        />

                        < PhotoCameraIcon style={{ "font-size": " 2rem", "margin-top": "-90px", "position": "absolute", "left": "17px" }}></PhotoCameraIcon>

                        <img for="photo-upload" style={styleImg} src={imsStateToShow ? imsStateToShow : person} />

                    </label>

                </Grid>



                <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>
                    <Input
                        autoComplete="fname"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="name"
                        {...name}
                        placeholder="Name"
                    />
                    <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="redColor">{message}</p>} />

                </Grid>
                <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>
                    <Input
                        variant="outlined"
                        required
                        fullWidth
                        id="adress"
                        label="Address"
                        name="adress"
                        autoComplete="lname"
                        {...adress}
                        placeholder="Address"
                    />
                    <ErrorMessage errors={errors} name="adress" render={({ message }) => <p className="redColor">{message}</p>} />

                </Grid>
                <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>
                    <Input
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        {...email}
                        onKeyUp={(e) => emailToPassword = e.target.value}
                        placeholder="Email"
                    />
                    <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="redColor">{message}</p>} />
                    {props.ifExist ? <p className="redColor">This Email Alrady Exist</p> : null}
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
                        // onKeyUp={(e) => emailToPassword = e.target.value}
                        {...passwordemail}
                    />

                    <ErrorMessage errors={errors} name="passwordemail" render={({ message }) => <p className="redColor">{message}</p>} />

                </Grid>


                <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>
                    <Multiselect
                        onSelect={(e) => setIfSelect(false)}
                        label="Category"
                        name="category"
                        options={categoriesArr ? categoriesArr : []}
                        isObject={false}
                        ref={listCategory} type="text"
                    />
                    {ifSelect && <p className="redColor">This is required.</p>}


                </Grid>
                <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>
                    <Input
                        variant="outlined"
                        required
                        fullWidth
                        id="phone"
                        label="Phone Namber"
                        name="phone"
                        autoComplete="phone"
                        {...phone}
                        placeholder="Phone"
                    />
                    <ErrorMessage errors={errors} name="phone" render={({ message }) => <p className="redColor">{message}</p>} />

                </Grid>

            </Grid>
            {props.errorInAdd ? <p className="redColor">Error System</p> : null}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{ backgroundImage: "linear-gradient(132deg, black 0%, #ff716e 0%, #0b0b2b 80%)" }}
            > Sign Up</Button>

        </form>
        {/* form */}
    </>



    );
}
const mapStateToProps = (state) => {

    return {};
}
export default connect(mapStateToProps, {})(AddingBusiness);