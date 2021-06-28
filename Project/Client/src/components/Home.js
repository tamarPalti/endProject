import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Link, Route } from 'react-router-dom';
import UsersSearch from './search/UseresSearch';
import BusinessSearch from './search/BusinessSearch';
import Search from './search/Search';
import UserDetailes from './Detailes/UserDetailes';
import { connect } from "react-redux";
import BusinessDetailes from './Detailes/BusinessDetailes';
const Home = (props) => {
    console.log("kkkk");
    
    return (
        <div>
    <Route path={ '/search'}>  <Search /> </Route>
    
    {/*  לוקח נתונים מהסטייט הכללי UserDetailes*/}
    <Route path={ '/userDetailes/:id'}>  <UserDetailes /> </Route>
    <Route path={ '/businessDetailes/:id'}>  <BusinessDetailes /> </Route>
    </div> );
}
const mapStateToProps = (state) => {
    return {  };
}
export default connect(mapStateToProps)(Home); 
