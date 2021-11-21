import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { AddTask, GetAllTypeTsks } from '../../util/index';
import task from '../classes/task';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useParams } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './classes.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));


//alerts

function Alert(props) {
    return <MuiAlert elevation={2} variant="filled" {...props} />;
}

//alerts


const AddUser = (props) => {


    const { register, formState: { errors }, handleSubmit } = useForm();
    const mail = register('mail', { required: "This is required." })

    const classes = useStyles();

    let Task = new task();

    const AddTaskFunc = async (data) => {
        Task.date = new Date();

        Task.codeUser = localStorage.getItem("currentUserId");

        let all = await GetAllTypeTsks();
        Task.type = all.data.find((type) => type.code ==3)._id;

        Task.otherbuisness = null;
        Task.status = false;
        Task.desription = "הוסף את המשתמש עם המייל:"+data.mail;
        Task.otherUser = null;
        Task.mail=data.mail;

        AddTask(Task).then((succ) => {

            settypeAlert("success");
            setmasseg("נשלח בהצלחה");
            handleClick();


        }).catch((error) => {

            settypeAlert("error");
            setmasseg(error.response.data)
            handleClick();

        });
        console.log(Task);
    }



    useEffect(() => {


    }, [])
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


        <div className="divAddUser">
            <p>{props.content}</p>
            <form noValidate onSubmit={handleSubmit(AddTaskFunc)}>
                <TextField
                    label="Dense"
                    id="outlined-margin-dense"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name="mail"
                    {...mail}
                />
                <ErrorMessage errors={errors} name="mail" render={({ message }) => <p className="redColor">{message}</p>} />
                
                <Button variant="contained" color="secondary" type="submit">
                    הגש בקשה
      </Button>
            </form>
        </div></>);
}

export default AddUser;