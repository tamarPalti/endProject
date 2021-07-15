import Business from "./Business";
import { connect } from "react-redux";
import { List } from 'semantic-ui-react'
import { useEffect } from 'react';
import { GetCurrentUser } from '../../actions/index';
const ResultSearchBusiness = (props) => {
    
    useEffect(() => {
        if (!props.CurrentUser && localStorage.getItem("currentUserMail") && localStorage.getItem("currentUserPassword"))
            props.GetCurrentUser({
                "password": localStorage.getItem("currentUserPassword"),
                "mail": localStorage.getItem("currentUserMail")
            });
    }, []);
    return (<>
        {props.CurrentUser ? <List divided verticalAlign='middle'>
            {props.BusinessSearch && props.BusinessSearch.map((item) => {
                return (<Business key={item._id} business={item} />);
            })}</List> : null}
    </>);
}
const mapStateToProps = (state) => {

    return { CurrentUser: state.usersPart.CurrentUser, BusinessSearch: state.businessPart.BusinessSearch };
}
export default connect(mapStateToProps,{GetCurrentUser})(ResultSearchBusiness); 