import React, { useEffect, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import business from '../../components/classes/business'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { Redirect } from 'react-router-dom';
import { getAllCategories, UpdateBuisnessFunc, GetCurrentBuisness, UpdateStatusTask } from '../../util/index';
import { Multiselect } from "multiselect-react-dropdown";
import { ChangeUpdateBuisness } from '../../actions/index';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';
import person from '../search/img/person.png';
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


function UpdateBuisnesOfManager(props) {


    // עיצוב
    const classes = useStyles();

    const [currentBuisness, setcurrentBuisness] = useState(null);
    const [imsState, setimsState] = useState();
    const [imsStateToShow, setimsStateToShow] = useState();
    const styleItem = {
        "padding": "0px",
        "top": "42px",
        "margin-left": "40%",
        "position": "relative"

    }
    const styleLable = {
        "width": "93%",
        "height": "30%",
        "margin-top": "-26%"
    }
    // const [ifGoToLogin, setifGoToLogin] = useState(false);
    const styleImg = {
        "width": props.imgW ? props.imgW : "59%",
        "border-radius": "50%",
        "height": props.imgH ? props.imgH : "13em",
        "margin-top": "-105%",
        "z-index": "10",
        "margin-left": props.imgMarginLeft

    }
    const styleInputImg = {
        "border-radius": "50%",
        "height": props.iconH ? props.iconH : "3em",
        "width": props.iconW ? props.iconW : "14%",
        "margin-left": props.iconMarginLeft ? props.iconMarginLeft : "3%",
        "margin-bottom": props.iconMarginBottom ? props.iconMarginBottom : "18%",
        "position": "relative"
    }
    let listCategory = useRef([]);
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [ifSelect, setIfSelect] = useState(false);

    // const { id,idTask } = useParams();
    const id = props.id;
    const idTask = props.idTask;

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


    // פונקצית העדכון
    const onSubmit = async data => {

        updateBuisness.listCategory = listCategory.current.getSelectedItems();


        let fd = new FormData();
        fd.append('img', imsState);
        fd.append('adress', data.adress);
        fd.append('name', data.name);
        fd.append('email', data.email);
        fd.append('phoneNamber', data.phoneNamber);
        fd.append('_id', currentBuisness._id);



        UpdateBuisnessFunc(currentBuisness._id, fd).then(succ => {
            // UpdateStatusTask(idTask, true);
            settypeAlert("success");
            setmasseg("Updating Success");
            handleClick();

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

        GetCurrentBuisness(id).then(succ => {
            setcurrentBuisness(succ.data)
        });

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
            {currentBuisness && <form className={classes.form} noValidate onSubmit={handleSubmit(() => onSubmit(updateBuisness))}>

                <Grid item xs={12} sm={4} style={styleItem}>
                    <label htmlFor="photo-upload" className="custom-file-upload fas" style={styleLable}>
                        <input type="file" className="form-control"
                            accept="image/png, image/jpeg"
                            name="image" onChange={(e) => onchangeImg(e)}
                            style={styleInputImg}
                        />
                        <img for="photo-upload" style={styleImg} src={imsStateToShow ? imsStateToShow : currentBuisness.img ? currentBuisness.img : person} />
                    </label>
                </Grid>

                <Grid container spacing={2} style={{"margin-top":"42px"}}>


                    <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>
                        <Input
                            autoComplete="fname"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            defaultValue={currentBuisness.name}
                            onKeyUp={(e) => onKeyUp(e, "name")}
                            {...name}
                        />
                        <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="redColor">{message}</p>} />
                    </Grid>

                    <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>
                        <Input
                            variant="outlined"
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            autoComplete="lname"
                            defaultValue={currentBuisness.adress}
                            onKeyUp={(e) => onKeyUp(e, "adress")}
                            {...adress}
                        />

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
                            defaultValue={currentBuisness.email}
                            onKeyUp={(e) => onKeyUp(e, "email")}
                            {...email}
                            disabled="true"
                        />

                        <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="redColor">{message}</p>} />
                        {props.ifExist ? <p className="redColor">This Email Alrady Exist</p> : null}
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
                            defaultValue={currentBuisness.phoneNamber}
                            onKeyUp={(e) => onKeyUp(e, "phoneNamber")}
                        />
                        <ErrorMessage errors={errors} name="phone" render={({ message }) => <p className="redColor">{message}</p>} />

                    </Grid>

                    <Grid item xs={12} sm={6} style={{ "padding": "22px" }}>
                        <Multiselect
                            onSelect={(e) => setIfSelect(false)}
                            label="Category"
                            name="category"
                            options={categoriesArr ? categoriesArr : []}
                            isObject={false}
                            ref={listCategory} type="text"
                            selectedValues={currentBuisness.listCategory}
                        />
                        {ifSelect && <p className="redColor">This is required.</p>}
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

            </form>}
        </>

    );
}
const mapStateToProps = (state) => {

    return { updateBuisness: state.businessPart.updateBuisness };
}
export default connect(mapStateToProps, { ChangeUpdateBuisness })(UpdateBuisnesOfManager);

