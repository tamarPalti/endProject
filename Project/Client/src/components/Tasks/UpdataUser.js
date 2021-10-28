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


const UpdataUser = (props) => {


    const { register, formState: { errors }, handleSubmit } = useForm();
    const desription = register('desription', { required: "This is required.", minLength: { value: 5, message: "Min 5" } })


    const classes = useStyles();

    const { idUser } = useParams();

    let Task = new task();

    const AddTaskFunc = async (data) => {
        Task.date = new Date();

        Task.codeUser = localStorage.getItem("currentUserId");


        let all = await GetAllTypeTsks();
        Task.type = all.data.find((type) => type.code == 1)._id;

        Task.otherbuisness = null;
        Task.status = false;
        Task.desription = data.desription;
        Task.otherUser = idUser;

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


        <div style={{ "margin-top": "37%" }}>
            <form noValidate onSubmit={handleSubmit(AddTaskFunc)}>
                <TextField
                    label="Dense"
                    id="outlined-margin-dense"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name="desription"
                    {...desription}
                />
                <ErrorMessage errors={errors} name="desription" render={({ message }) => <p className="redColor">{message}</p>} />

                <Button variant="contained" color="secondary" type="submit">
                    הגש בקשה
      </Button>
            </form>
        </div></>);
}

export default UpdataUser;