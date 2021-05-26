import { connect } from "react-redux";
import './User.scss';
import { SelectedUser } from '../../actions/index';
const User = (props) => {
    
    return (<div className="place_user" onClick={()=>props.SelectedUser(props.user)}>
        <p className="tow">{props.user.firstName} {props.user.lastName}</p>
        <i className="user icon tow"></i>

    </div>);
}
const mapStateToProps = (state) => {

    return { };
}
export default connect(mapStateToProps,{SelectedUser})(User);