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
        <div>
    <Route path={ '/search'}>  <Search /> </Route>
    
    {/*  לוקח נתונים מהסטייט הכללי UserDetailes*/}
    <Route path={ '/detailes/:id'}>  <UserDetailes /> </Route>
    </div> );
}
const mapStateToProps = (state) => {
    return {  };
}
export default connect(mapStateToProps)(Home); 
