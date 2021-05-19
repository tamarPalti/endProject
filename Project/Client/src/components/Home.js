import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Link, Route } from 'react-router-dom';
import UsersSearch from './search/UseresSearch';
import BusinessSearch from './search/BusinessSearch';
import Search from './search/Search';
const Home = (props) => {
    console.log("kkkk");
    
    return (<Search />);
}

export default Home;