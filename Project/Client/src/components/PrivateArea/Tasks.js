import React, { useEffect, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import business from '../../components/classes/business'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { Redirect, useRouteMatch, Link, Route, Switch } from 'react-router-dom';
import { GetCurrentUser, GetTaskByUserId } from '../../util/index';
import { Multiselect } from "multiselect-react-dropdown";
import { ChangeUpdateBuisness } from '../../actions/index';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom'
import AddCtegory from '../Tasks/AddCtegory'
import AddUser from '../Tasks/AddUser';


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


function Tasks(props) {

    const [currentUser, setCurrentUser] = useState(null);
    const [tasksArr, settasksArr] = useState([]);

    const { url, path } = useRouteMatch();
    // עיצוב
    const classes = useStyles();

    // טופס
    const { register, formState: { errors }, handleSubmit } = useForm();
    const name = register('name', { minLength: { value: 2, message: "Min 2" } })

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


    useEffect(() => {
        GetCurrentUser().then(succ => {
            setCurrentUser(succ.data);
            GetTaskByUserId(succ.data._id).then((item) => {
                settasksArr(item.data);
            }).catch(err => {
                console.log(err);
            });
        }).catch(error => {
            console.log(error);

        });
    }, [])

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeAlert}> {masseg}</Alert>
            </Snackbar>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <h3>הפניות שלך</h3>
                    {tasksArr && tasksArr.map((task) => <><p>נושא:{task.type.name}</p>
                        <p>תאור:{task.desription}</p>
                        <p>תאריך:{task.date}</p>
                        <p>טופל:{task.status}</p></>)}
                </Grid>
            </Grid>
            <h3>פניה חדשה</h3>
            <Link to={`${url}/addUser`}>הוספת משתמש</Link>
            <br />
            <Link to={`${url}/addCategory`}>הוספת קטגוריה</Link>
            <Switch>
                <Route path={`${path}/addUser`}>
                     <AddUser/>
                </Route>
                <Route path={`${path}/addCategory`}>
                    <AddCtegory />
                </Route>
            </Switch>

        </>

    );
}
const mapStateToProps = (state) => {

    return {};
}
export default connect(mapStateToProps, {})(Tasks);

