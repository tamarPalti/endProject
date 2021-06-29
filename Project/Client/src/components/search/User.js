import { connect } from "react-redux";
import './User.scss';
import { SelectedUser, ChangeColorFirstName, ChangeColorLastName } from '../../actions/index';
import { useRef, useEffect } from "react";
import { Link, Route } from 'react-router-dom';
import UserDetailes from '../Detailes/UserDetailes'
import ico from './img/alex.png'
const User = (props) => {

    let indexName = props.user.firstName.indexOf(props.ColorFirstName);
    let start = props.user.firstName.substring(0, indexName);
    let end = props.user.firstName.substring(indexName + props.ColorFirstName.length, props.user.firstName.length);
    let indexLastName = props.user.lastName.indexOf(props.ColorLastName);
    let Laststart = props.user.lastName.substring(0, indexLastName);
    let Lastend = props.user.lastName.substring(indexLastName + props.ColorLastName.length, props.user.lastName.length);
    const checkName = (name) => {
        return name[0] >= 'A' && name[0] <= 'Z' || name[0] >= 'a' && name[0] <= 'z';
    }
    useEffect(() => {

    }, []);
    return (<div><Link to={'/userDetailes/' + props.user._id} style={{ textDecoration: 'none', color: 'black' }}> <div className="place_user" onClick={() => props.SelectedUser(props.user)}>
        <p className="display">{checkName(props.user.lastName) ? Laststart : Lastend}</p>
        {!checkName(props.user.firstName)&&(Lastend[0] == ' '||props.ColorLastName[props.ColorLastName.length-1]==' ' )? <p className="display">&nbsp;</p> : null}
        <p className="color_name display">{props.ColorLastName}</p>
        {checkName(props.user.firstName)&&(Lastend[0] == ' '||props.ColorLastName[props.ColorLastName.length-1]==' ' ) ? <p className="display">&nbsp;</p> : null}
        <p className="display">{checkName(props.user.lastName) ? Lastend : Laststart}</p>
        <p className="display">&nbsp;</p>
        <p className="display">{checkName(props.user.firstName) ? start : end}</p>
        {!checkName(props.user.lastName)&&(end[0] == ' ' ||props.ColorFirstName[props.ColorFirstName.length-1]==' ')? <p className="display">&nbsp;</p> : null}
        <p className="color_name display">{props.ColorFirstName}</p>
        {checkName(props.user.lastName)&&(end[0] == ' '||props.ColorFirstName[props.ColorFirstName.length-1]==' ' )? <p className="display">&nbsp;</p> : null}
        <p className="display">{checkName(props.user.firstName) ? end : start}</p>
        <img className="img_ico" src={ico}></img>
    </div>
    </Link>
    </div>
    );
}
const mapStateToProps = (state) => {

    return { ColorFirstName: state.usersPart.ColorFirstName, ColorLastName: state.usersPart.ColorLastName };
}
export default connect(mapStateToProps, { SelectedUser, ChangeColorFirstName, ChangeColorLastName })(User);


