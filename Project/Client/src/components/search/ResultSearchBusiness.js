import Business from "./Business";
import { connect } from "react-redux";
import { List } from 'semantic-ui-react'
import { useEffect, useState } from 'react';
import { GetCurrentUser } from '../../actions/index';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import MyLocation from "./MyLocation";
import { log } from "util";
const ResultSearchBusiness = (props) => {
    // const [Location, setLocation] = useState({ lat: '', len: '' });
    // const [Let, setLet] = useState('');
    // const [Len, setLen] = useState('');
    useEffect(() => {
        // console.log('change')
    }, []);

    return (<>
        {<List divided verticalAlign='middle'>
            {props.BusinessSearch && props.BusinessSearch.map((item) => {
                return (<Business ifAdd="true" key={item._id} business={item} />);
            })}</List>}

        {/* <MyLocation setLocation={setLocation} Location={Location} setLet={setLet} setLen={setLen} /> */}
        {/* {Location && Location.lat} */}
        {/* {Let && Let} */}
    </>);
}
const mapStateToProps = (state) => {

    return { CurrentUser: state.usersPart.CurrentUser, BusinessSearch: state.businessPart.BusinessSearch };
}
export default connect(mapStateToProps, { GetCurrentUser })(ResultSearchBusiness); 