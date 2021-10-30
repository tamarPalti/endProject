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
import { getAllCategories, AddCategory as AddCategoryFunc, UpdateStatusTask } from '../../util/index';
import { Multiselect } from "multiselect-react-dropdown";
import { ChangeUpdateBuisness } from '../../actions/index';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom'

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


function AddCategory(props) {
    // const { idTask } = useParams();

    const idTask = props.idTask;
    // עיצוב
    const classes = useStyles();

    const [categoriesArr, setCategoriesArr] = useState([]);

    // משתנה להוספה 
    let category = {};

    // טופס
    const { register, formState: { errors }, handleSubmit } = useForm();
    const name = register('name', { minLength: { value: 2, message: "Min 2" } })

    // פונקצית העדכון
    const onSubmit = async data => {
        AddCategoryFunc(data).then(succ => {

            // UpdateStatusTask(idTask,true);
            settypeAlert("success");
            setmasseg("Add Success");
            handleClick();

        }).catch(error => {

            settypeAlert("error");
            setmasseg(error.response.data)
            handleClick();

        });


    }




    const onKeyUp = (e, type) => {
        category[type] = e.target.value;
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
            setCategoriesArr(succ.data);
        }).catch(err => {
            console.log(err);
        });

    }, [])

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeAlert}> {masseg}</Alert>
            </Snackbar>
            {<form className={classes.form} noValidate onSubmit={handleSubmit(() => onSubmit(category))}>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <h3>קטגוריות בשימוש</h3>
                        {categoriesArr && categoriesArr.map((category) => <p>{category.name}</p>)}
                    </Grid>
                </Grid>

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
                            onKeyUp={(e) => onKeyUp(e, "name")}
                            {...name}
                        />
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                     style={{ backgroundImage: "linear-gradient(132deg, black 0%, #ff716e 0%, #0b0b2b 80%)" }}>
                   
                    Add
                </Button>

            </form>}
        </>

    );
}
const mapStateToProps = (state) => {

    return {};
}
export default connect(mapStateToProps, {})(AddCategory);

