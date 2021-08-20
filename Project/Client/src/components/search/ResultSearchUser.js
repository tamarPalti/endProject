import User from "./User";
import { connect } from "react-redux";
import { List } from 'semantic-ui-react'
import { useEffect } from 'react';
import { GetCurrentUser } from '../../actions/index';

const ResultSearchUser = (props) => {

    useEffect(() => {
    }, []);
    return (<>
        {<List divided verticalAlign='middle'>
            {props.UserSearch&&props.UserSearch.map((item) => {
                return (<User ifAdd="true" key={item._id} user={item} />);
            })} </List>}
    </>);
}
const mapStateToProps = (state) => {
    return { CurrentUser: state.usersPart.CurrentUser, UserSearch: state.usersPart.UserSearch };
}
export default connect(mapStateToProps, { GetCurrentUser })(ResultSearchUser); 