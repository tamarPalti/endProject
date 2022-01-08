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
import 'semantic-ui-css/semantic.min.css';
import './Task.scss';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

import { Button as Button2, Grid as Grid2, Popup as Popup2 } from 'semantic-ui-react';


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


    // const onchangeImg = (e) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //       setimsState(e.target.files[0]);
    //       console.log(e.target.files[0]);
    //       setimsStateToShow(e.target.value);
    //       e.preventDefault();
    //       const reader = new FileReader();
    //       const file = e.target.files[0];
    //       reader.onloadend = () => {
    //         setimsStateToShow(reader.result);
    //       }
    //       reader.readAsDataURL(file);
    //     }

    //   }
    function myFunction(currentUrl) {
        window.open(url + "/" + currentUrl, "add", "width=1600,height=300");

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
            {/* <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <h3>הפניות שלך</h3>
                   
                </Grid>
            </Grid> */}

            <div >
              
                <Switch>
                    <Route path={`${path}/addUser`}>
                        <AddUser content="You can send a new user email to the system administrator"/>
                    </Route>
                    <Route path={`${path}/addCategory`}>
                        <AddCtegory content="You can send the administrator a new category name for the system" />
                    </Route>
                    <Route>

                        <div className="divTable">
                            <table class="ui celled structured table tableDiv" style={{"direction": "rtl"}}>
                                <thead>
                                    <tr>
                                        <th rowspan="2">subject</th>
                                        <th rowspan="2">description</th>
                                        <th rowspan="2">date</th>
                                        <th colspan="3">status</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {tasksArr && tasksArr.map((task) => <>

                                        <tr>
                                            <td>{task.type.name}</td>
                                            <td class="right aligned">{task.desription}</td>
                                            <td>{task.date}</td>

                                            <td class="center aligned">
                                                {task.status && <i style={{ "right": "0em", "position": "relative" }} class="large green checkmark icon"></i>}
                                            </td>

                                        </tr>


                                    </>)}

                                </tbody>
                            </table>



                        </div>


                        <Popup2 wide trigger={<Fab color="primary" aria-label="add" className="button2Class">
                            <AddIcon />
                        </Fab>} on='click'>
                            <Grid2 divided columns='equal'>
                                <Grid2.Column>
                                    <Popup2
                                        trigger={<Button2 style={{ "background-color": "rgb(11, 11, 43)" }} onClick={() => myFunction("addCategory")} color='blue' content='add category' fluid />}
                                        content='Send a request to the administrator to add a new category to the system'
                                        position='top center'
                                        size='tiny'
                                        inverted
                                    />
                                </Grid2.Column>
                                <Grid2.Column>
                                    <Popup2
                                        trigger={<Button2 style={{ "background-color": "rgb(255, 113, 110)" }} onClick={() => myFunction("addUser")} color='red' content='add user' fluid />}
                                        content='Submit a request to the administrator to add a new user to the system'
                                        position='top center'
                                        size='tiny'
                                        inverted
                                    />
                                </Grid2.Column>
                            </Grid2>
                        </Popup2>


                    </Route>
                </Switch>
            </div>





        </>

    );
}
const mapStateToProps = (state) => {

    return {};
}
export default connect(mapStateToProps, {})(Tasks);

