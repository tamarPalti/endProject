

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import Users from'./Histories/Users';
import Buisness from './Histories/Buisness';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));


const SearchHistory = (props) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [ifGoToLogin, setifGoToLogin] = useState(false);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const GetCuccentUser = async () => {
        axios.get(`http://localhost:4000/users/${localStorage.getItem("currentUserId")}`).then(data => {
            setCurrentUser(data.data);
        }).catch(() => {
            setifGoToLogin(true);
        });
    }
    
    useEffect(() => {
        GetCuccentUser();
    }, []);

    return (<>
        {ifGoToLogin ? <Redirect to={'/SignIn'} /> : currentUser ?
            <>
                <div className={classes.root}>
                    <AppBar position="static" color="default" width="22%">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"              
                        >
                            <Tab label="Users"  {...a11yProps(0)} />
                            <Tab label="Business" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}><Users/></TabPanel>
                    <TabPanel value={value} index={1}><Buisness/></TabPanel>
                </div>
            </>
            : null}
    </>);
}
export default SearchHistory;

