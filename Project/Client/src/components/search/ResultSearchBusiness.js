import Business from "./Business";
import { connect } from "react-redux";
import { List } from 'semantic-ui-react'
import { useEffect } from 'react';
import { GetCurrentUser } from '../../actions/index';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
const ResultSearchBusiness = (props) => {

    useEffect(() => {
    }, []);
    return (<>
        {localStorage.getItem("currentUserMail") !="null" ? <List divided verticalAlign='middle'>
            {props.BusinessSearch && props.BusinessSearch.map((item) => {
                return (<Business key={item._id} business={item} />);
            })}</List> : <Redirect to={'/'} />}
    </>);
}
const mapStateToProps = (state) => {

    return { CurrentUser: state.usersPart.CurrentUser, BusinessSearch: state.businessPart.BusinessSearch };
}
export default connect(mapStateToProps, { GetCurrentUser })(ResultSearchBusiness); 