import { connect } from "react-redux";
import './User.scss';
import { SelectedUser } from '../../actions/index';
import { useRef, useEffect } from "react";
const User = (props) => {

    let indexName = props.user.firstName.indexOf(props.ColorName);
    let start = props.user.firstName.substring(0, indexName);
    let end = props.user.firstName.substring(indexName + props.ColorName.length, props.user.firstName.length + indexName + props.ColorName.length);
    useEffect(() => {
    });
    return (<div className="place_user" onClick={() => props.SelectedUser(props.user)}>
        <p>{start} </p>
        <p className="color_name">ךךך   {props.ColorName}</p>
        <p>{end}</p>
        {/* <p className="tow" ref={name}>{props.user.firstName} {props.user.lastName}</p> */}
        <i className="user icon tow"></i>

    </div>);
}
const mapStateToProps = (state) => {

    return { ColorName: state.usersPart.ColorName };
}
export default connect(mapStateToProps, { SelectedUser })(User);