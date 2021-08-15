import React, { useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Link, Route, Switch } from 'react-router-dom';
import UsersSearch from './search/UseresSearch';
import BusinessSearch from './search/BusinessSearch';
import Search from './search/Search';
import { connect } from "react-redux";
// import SingIn from './LogIn/singIn';
import SingIn from './LogIn/singIn';
import SignUp from './LogIn/SingUp';
import PrivateArea from './PrivateArea/PrivateArea';
import CustomizedSteppers from './PrivateArea/PrivateArea';

const Home = (props) => {

    useEffect(() => {
        // if (localStorage.getItem("currentUser"))
        //     props.SingIn(localStorage.getItem("currentUser"));
    })
    return (
        <div>
            {/* <Switch>
                <Route path={'/Search'}>
                    <Search />
                </Route>
                <Route path={'/SignUp'}>
                    <SignUp />
                </Route>
                <Route path={'/'}>
                    <SingIn />
                </Route>
            </Switch> */}
<PrivateArea/>
{/* <CustomizedSteppers/> */}
        </div>);
}
const mapStateToProps = (state) => {
    return { CurrentUser: state.usersPart.CurrentUser };
}
export default connect(mapStateToProps,{})(Home); 
