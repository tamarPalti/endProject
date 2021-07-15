import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Link, Route,Switch } from 'react-router-dom';
import UsersSearch from './search/UseresSearch';
import BusinessSearch from './search/BusinessSearch';
import Search from './search/Search';
import { connect } from "react-redux";
// import SingIn from './LogIn/singIn';
import SingIn from './LogIn/singIn';
import SingUp from './LogIn/SingUp'
const Home = (props) => {
    console.log("kkkk");

    return (
        <div>
            <Switch>
                <Route path={'/search'}>
                    <Search />
                </Route>
                <Route path={'/SignUp'}>
                    <SingUp />
                </Route>
                <Route path={'/'}>
                    <SingIn />
                </Route>
            </Switch>
        </div>);
}
const mapStateToProps = (state) => {
    return { CurrentUser: state.usersPart.CurrentUser };
}
export default connect(mapStateToProps)(Home); 
