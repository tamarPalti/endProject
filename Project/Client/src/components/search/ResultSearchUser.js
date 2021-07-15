import User from "./User";
import { connect } from "react-redux";
import {  List } from 'semantic-ui-react'
import { useEffect } from 'react';
import { GetCurrentUser } from '../../actions/index';
const ResultSearchUser = (props) => {

    useEffect(() => {
        if (!props.CurrentUser && localStorage.getItem("currentUserMail") && localStorage.getItem("currentUserPassword"))
            props.GetCurrentUser({
                "password": localStorage.getItem("currentUserPassword"),
                "mail": localStorage.getItem("currentUserMail")
            });
    }, []);
    return (<>
        <List divided verticalAlign='middle'>
            {props.UserSearch && props.UserSearch.map((item) => {
                return (<User key={item._id} user={item} />);
            })} </List>
    </>);
}
const mapStateToProps = (state) => {
    return { UserSearch: state.usersPart.UserSearch };
}
export default connect(mapStateToProps,{GetCurrentUser})(ResultSearchUser); 