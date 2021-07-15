import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Link, Route } from 'react-router-dom';
import UsersSearch from './search/UseresSearch';
import BusinessSearch from './search/BusinessSearch';
import Search from './search/Search';
import { connect } from "react-redux";
import SingIn from './LogIn/singIn';
const Home = (props) => {
    console.log("kkkk");
    
    return (
        <div>
    <Route path={ '/'}>  
      if()
        <SingIn /> 
    
    </Route>
    
    </div> );
}
const mapStateToProps = (state) => {
    return {CurrentUser:state.usersPart.CurrentUser   };
}
export default connect(mapStateToProps)(Home); 
