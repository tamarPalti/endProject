import './Search.scss'
import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Link, Route } from 'react-router-dom';
import UsersSearch from './UseresSearch';
import BusinessSearch from './BusinessSearch';

const Search = () => {
    let users = React.createRef();
    let business = React.createRef();
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
    return (<><div className="back-search">
        <div class="ui pointing menu three ">
            <Link to="/users">
                <a class="active item teal sizetab" ref={users} onClick={(e) => ChangeButtonUsers(e)}>
                    Users
            </a>
            </Link>
            <Link to="/business">
                <a class="item sizetab" ref={business} onClick={(e) => ChangeButtonBusiness(e)}>
                    Business
    </a>
            </Link>
            <div className="place_search">
                <Route path="/users">
                    <UsersSearch />
                </Route>
                <Route path="/business">
                    <BusinessSearch />
                </Route>
            </div>
        </div>


    </div></>);
}

export default Search;