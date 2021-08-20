import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Users.scss';
import Business from "../../search/Business";
import { GetCurrentUser, DeleteHistoryBusiness } from '../../../util/index';

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
    style: {
        maxWidth: "32%"
    }
}));

const Buisness = (props) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [ifGoToLogin, setifGoToLogin] = useState(false);

    const classes = useStyles();
    const [secondary, setSecondary] = React.useState(false);

    const GetCuccentUserFunc = async () => {

        GetCurrentUser().then(succ => setCurrentUser(succ.data)).catch(() => setifGoToLogin(true));
    }

    const DeleteHistoryFunc = async (index) => {
        DeleteHistoryBusiness(index).then(succ => {
            if (succ.status == 200)
                GetCuccentUserFunc();
        })
    }


    useEffect(() => {

        GetCuccentUserFunc();

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
                                            <IconButton edge="end" aria-label="delete" onClick={() => DeleteHistoryFunc(index)}>
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

