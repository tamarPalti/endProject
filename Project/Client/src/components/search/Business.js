import { connect } from "react-redux";
import './User.scss';
import { SelectedBusiness, ChangeColorName } from '../../actions/index';
import { useRef, useEffect } from "react";
import { Link, Route } from 'react-router-dom';
// import UserDetailes from '../Detailes/UserDetailes'
import ico from './img/alex.png'
const Business = (props) => {

    let indexName = props.business.name.indexOf(props.ColorName);
    let start = props.business.name.substring(0, indexName);
    let end = props.business.name.substring(indexName + props.ColorName.length, props.business.name.length);
    const checkName = (name) => {
        return name[0] >= 'A' && name[0] <= 'Z' || name[0] >= 'a' && name[0] <= 'z';
    }
    useEffect(() => {

    }, []);
    return (<div><Link to={'/businessDetailes/' + props.business._id} style={{ textDecoration: 'none', color: 'black' }}>
        <div className="place_user" onClick={() => props.SelectedBusiness(props.business)}>
            <p className="display">&nbsp;</p>
            <p className="display">{checkName(props.business.name) ? start : end}</p>
            {!checkName(props.business.name) && (end[0] == ' ' || props.ColorName[props.ColorName.length - 1] == ' ') ? <p className="display">&nbsp;</p> : null}

            <p className="color_name display">{props.ColorName}</p>
            {checkName(props.business.name) && (end[0] == ' ' || props.ColorName[props.ColorName.length - 1] == ' ') ? <p className="display">&nbsp;</p> : null}

            <p className="display">{checkName(props.business.name) ? end : start}</p>
            <img className="img_ico" src={ico}></img>
        </div>
    </Link>
    </div>
    );
}
const mapStateToProps = (state) => {

    return { ColorName: state.businessPart.ColorName };
}
export default connect(mapStateToProps, { SelectedBusiness, ChangeColorName })(Business);
