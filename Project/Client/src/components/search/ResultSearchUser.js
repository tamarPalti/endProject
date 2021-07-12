import User from "./User";
import { connect } from "react-redux";
import {  List } from 'semantic-ui-react'

const ResultSearchUser = (props) => {
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
export default connect(mapStateToProps)(ResultSearchUser); 