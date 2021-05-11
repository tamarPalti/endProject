import { connect } from "react-redux";
import './User.scss'
const User = (props) => {
    console.log("user  ");
    return (<div className="place_user">
        <p className="tow">{props.user.firstName} {props.user.lastName}</p>

        <i className="user icon tow"></i>

    </div>);
}

export default User;