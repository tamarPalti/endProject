import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Users.scss'



import Business from "../../search/Business";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    style:{
        maxWidth: "32%"
    }
}));

const Buisness = (props) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [ifGoToLogin, setifGoToLogin] = useState(false);

    const classes = useStyles();
    // const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const GetCuccentUser = async () => {
        let succ = await axios.get(`http://localhost:4000/users/${localStorage.getItem("currentUserId")}`);
        if (succ.status == 404)
            setifGoToLogin(true);
        else
            setCurrentUser(succ.data);
    }
    const DeleteHistory=async(index)=>{
        let succ = await axios.put(`http://localhost:4000/users/deleteHistoryBusiness/${localStorage.getItem("currentUserId")}&${index}`);
        if(succ.status==200)
            GetCuccentUser();      
    }
    useEffect(() => {
        GetCuccentUser();
    }, []);

    return (<>
        {ifGoToLogin ? <Redirect to={'/SingIn'} /> : currentUser ?
            <>
                <Grid item xs={12} md={6}>
                    <div className={classes.demo}>
                        <List>
                            {
                                currentUser.lastSearchBusiness.map((item, index) => {
                                        return (<ListItem>
                                            <ListItemAvatar>
                                                <IconButton edge="end" aria-label="delete" onClick={()=> DeleteHistory(index) }>
                                                    <DeleteIcon style={{ "font-size": "1.5em" }} />
                                                </IconButton>

                                            </ListItemAvatar>
                                            {/* <p>{item.date}</p> */}
                                            <ListItemText
                                                primary={<Business ifAdd="false" business={item.businessSearch} key={index} />}
                                                secondary={secondary ? 'Secondary text' : null}
                                            />
                                        </ListItem>)
                                })
                            }
                        </List>
                    </div>
                </Grid>
            </>
            : null}

    </>);
}

export default Buisness;

