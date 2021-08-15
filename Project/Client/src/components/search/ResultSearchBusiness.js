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
        {<List divided verticalAlign='middle'>
            {props.BusinessSearch && props.BusinessSearch.map((item) => {
                return (<Business ifAdd="true" key={item._id} business={item} />);
            })}</List>}
    </>);
}
const mapStateToProps = (state) => {

    return { CurrentUser: state.usersPart.CurrentUser, BusinessSearch: state.businessPart.BusinessSearch };
}
export default connect(mapStateToProps, { GetCurrentUser })(ResultSearchBusiness); 