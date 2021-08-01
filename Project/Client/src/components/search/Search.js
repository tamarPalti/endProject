import './Search.scss'
import React, { useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Link, Route } from 'react-router-dom';
import UsersSearch from './UseresSearch';
import BusinessSearch from './BusinessSearch';
import ResultSearchUser from './ResultSearchUser';
import ResultSearchBusiness from './ResultSearchBusiness';
import { connect } from "react-redux";
import { GetCurrentUser } from '../../actions/index';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
const Search = (props) => {


    let users = React.createRef();
    let business = React.createRef();
    // useEffect(() => {


    // }, []);
    const ChangeButtonUsers = (e) => {
        e.target.classList.add("active");
        e.target.classList.add("teal");
        business.current.classList.remove("active");
        business.current.classList.remove("teal");
    }
    const ChangeButtonBusiness = (e) => {
        e.target.classList.add("active");
        e.target.classList.add("teal");
        users.current.classList.remove("active");
        users.current.classList.remove("teal");
    }
    return (<>
        {localStorage.getItem("currentUserMail") !="null"? <div className="back-search">
            <div className="ui pointing menu three serach_div">
                <Link to="/search/users" className="div_link">
                    <a className="item sizetab item-user" ref={users} onClick={(e) => ChangeButtonUsers(e)}>
                        Users</a>
                </Link>
                <Link to="/search/business" className="div_link">
                    <a className="item sizetab" ref={business} onClick={(e) => ChangeButtonBusiness(e)}>
                        Business</a>
                </Link>
                <div className="place_search">
                    <Route path="/search/users">
                      {localStorage.getItem("currentUserMail") !="null"?<>  <UsersSearch />
                        <div className="place_result">
                            <ResultSearchUser />
                        </div></>:<Redirect to={'/'}/>}
                    </Route>
                    <Route path="/search/business">
                    {localStorage.getItem("currentUserMail") !="null"?<>    <BusinessSearch />
                        <div className="place_result">
                            <ResultSearchBusiness />
                        </div></>:<Redirect to={'/'}/>}
                    </Route>
                </div>
            </div>

        </div> :  <Redirect to={'/'} />}</>);
}
const mapStateToProps = (state) => {
    return { CurrentUser: state.usersPart.CurrentUser };
}
export default connect(mapStateToProps, { GetCurrentUser })(Search);



// // import './Search.scss'
// // import React, { useEffect } from 'react'
// // import 'semantic-ui-css/semantic.min.css';
// // import { Link, Route } from 'react-router-dom';
// import UsersSearch from './UseresSearch';
// import BusinessSearch from './BusinessSearch';
// import { connect } from "react-redux";
// import { GetCurrentUser } from '../../actions/index';
// // import { Redirect, useHistory, useLocation } from 'react-router-dom';


// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import PhoneIcon from '@material-ui/icons/Phone';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import PersonPinIcon from '@material-ui/icons/PersonPin';
// import HelpIcon from '@material-ui/icons/Help';
// import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
// import ThumbDown from '@material-ui/icons/ThumbDown';
// import ThumbUp from '@material-ui/icons/ThumbUp';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`scrollable-force-tabpanel-${index}`}
//             aria-labelledby={`scrollable-force-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box p={3}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//     return {
//         id: `scrollable-force-tab-${index}`,
//         'aria-controls': `scrollable-force-tabpanel-${index}`,
//     };
// }

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         width: '100%',
//         backgroundColor: theme.palette.background.paper,
//     },
// }));

// const Search=(props)=> {
//     const classes = useStyles();
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     return (
//         localStorage.getItem("currentUserMail") != "null" ? <div className={classes.root}>
//             <AppBar position="static" color="default">
//                 <Tabs
//                     value={value}
//                     onChange={handleChange}
//                     variant="scrollable"
//                     scrollButtons="on"
//                     indicatorColor="primary"
//                     textColor="primary"
//                     aria-label="scrollable force tabs example"
//                 >
//                     <Tab label="Item One" icon={<PersonPinIcon />} {...a11yProps(0)} />
//                     <Tab label="Item Two" icon={<PersonPinIcon />} {...a11yProps(1)} />
//                 </Tabs>
//             </AppBar>
//             <TabPanel value={value} index={0}>
//                 <UsersSearch />

//             </TabPanel>
//             <TabPanel value={value} index={1}>
//                 <BusinessSearch />
             
//             </TabPanel>

//         </div> : null
//     );
// }
// const mapStateToProps = (state) => {
//     return { CurrentUser: state.usersPart.CurrentUser };
// }
// export default connect(mapStateToProps, { GetCurrentUser })(Search);

