import { connect } from "react-redux";
import './User.scss';
import { SelectedUser } from '../../actions/index';
import { useRef, useEffect } from "react";
const User = (props) => {

    let indexName = props.user.firstName.indexOf(props.ColorFirstName);
    let start = props.user.firstName.substring(0, indexName);
    let end = props.user.firstName.substring(indexName + props.ColorFirstName.length, props.user.firstName.length);
    let indexLastName = props.user.lastName.indexOf(props.ColorLastName);
    let Laststart = props.user.lastName.substring(0, indexLastName);
    let Lastend = props.user.lastName.substring(indexLastName + props.ColorLastName.length, props.user.lastName.length);
    useEffect(() => {
    });
    return (<div className="place_user" onClick={() => props.SelectedUser(props.user)}>
         <p>{Lastend}</p>      
         <p className="color_name">{props.ColorLastName}</p>
         <p>{Laststart}</p> 
         <p>&nbsp;</p>
         <p>{end}</p>      
         <p className="color_name">{props.ColorFirstName}</p>
         <p>{start}</p>
        
        
        {/* <p className="tow" ref={name}>{props.user.firstName} {props.user.lastName}</p> */}
        <i className="user icon tow"></i>

    </div>);
}
const mapStateToProps = (state) => {

    return { ColorFirstName: state.usersPart.ColorFirstName, ColorLastName: state.usersPart.ColorLastName};
}
export default connect(mapStateToProps, { SelectedUser })(User);