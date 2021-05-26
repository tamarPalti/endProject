import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Link, Route } from 'react-router-dom';
import UsersSearch from './search/UseresSearch';
import BusinessSearch from './search/BusinessSearch';
import Search from './search/Search';
import UserDetailes from './Detailes/UserDetailes';
import { connect } from "react-redux";
const Home = (props) => {
    console.log("kkkk");
    
    return (
    props.SelectedUser?<UserDetailes/>:<Search />
);
}
const mapStateToProps = (state) => {
    return { SelectedUser: state.usersPart.SelectedUser };
}
export default connect(mapStateToProps)(Home); 
