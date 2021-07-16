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
                        Users
            </a>
                </Link>
                <Link to="/search/business" className="div_link">
                    <a className="item sizetab" ref={business} onClick={(e) => ChangeButtonBusiness(e)}>
                        Business
    </a>
                </Link>
                <div className="place_search">
                    <Route path="/search/users">
                        <UsersSearch />
                        <div className="place_result">
                            <ResultSearchUser />
                        </div>
                    </Route>
                    <Route path="/search/business">
                        <BusinessSearch />
                        <div className="place_result">
                            <ResultSearchBusiness />
                        </div>
                    </Route>
                </div>
            </div>

        </div> :  <Redirect to={'/'} />}</>);
}
const mapStateToProps = (state) => {
    return { CurrentUser: state.usersPart.CurrentUser };
}
export default connect(mapStateToProps, { GetCurrentUser })(Search);
