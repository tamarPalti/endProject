import { connect } from "react-redux";
import './User.scss';
import { SelectedUser, ChangeColorFirstName, ChangeColorLastName } from '../../actions/index';
import { useRef, useEffect } from "react";
import { Link, Route } from 'react-router-dom';
import ico from './img/alex.png'
import React from 'react'
import { Button, Image, Modal, List } from 'semantic-ui-react'
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

    const [open, setOpen] = React.useState(false)

    return (
        <List.Item key={props.user._id}>
            <List.Content floated='right'>
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<div><div className="place_user" onClick={() => props.SelectedUser(props.user)}>
                        <p className="display">{checkName(props.user.lastName) ? Laststart : Lastend}</p>
                        {!checkName(props.user.lastName) && (Lastend[0] == ' ' || props.ColorLastName[props.ColorLastName.length - 1] == ' ') ? <p className="display">&nbsp;</p> : null}
                        {checkName(props.user.firstName) && (Laststart[Laststart.length - 1] == ' ' || props.ColorLastName[props.ColorLastName.length - 1] == ' ') ? <p className="display">&nbsp;</p> : null}

                        <p className="color_name display">{props.ColorLastName}</p>
                        {!checkName(props.user.lastName) && (Laststart[Laststart.length - 1] == ' ' || props.ColorLastName[props.ColorLastName.length - 1] == ' ') ? <p className="display">&nbsp;</p> : null}
                        {checkName(props.user.lastName) && (Lastend[0] == ' ' || props.ColorLastName[props.ColorLastName.length - 1] == ' ') ? <p className="display">&nbsp;</p> : null}

                        <p className="display">{checkName(props.user.lastName) ? Lastend : Laststart}</p>
                        <p className="display">&nbsp;</p>
                        <p className="display">{checkName(props.user.firstName) ? start : end}</p>

                        {checkName(props.user.lastName) && (start[start.length - 1]) == ' ' ? <p className="display">&nbsp;</p> : null}
                        {!checkName(props.user.lastName) && (end[0] == ' ' || props.ColorFirstName[props.ColorFirstName.length - 1] == ' ') ? <p className="display">&nbsp;</p> : null}

                        <p className="color_name display">{props.ColorFirstName}</p>
                        {checkName(props.user.lastName) && (end[0] == ' ' || props.ColorFirstName[props.ColorFirstName.length - 1] == ' ') ? <p className="display">&nbsp;</p> : null}
                        {!checkName(props.user.lastName) && (start[start.length - 1]) == ' ' ? <p className="display">&nbsp;</p> : null}

                        <p className="display">{checkName(props.user.firstName) ? end : start}</p>
                        <img className="img_ico" src={ico}></img>
                    </div>

                    </div>}
                >
                    <Modal.Content image>
                        <Modal.Description  >
                            <h1 className="place_name">{props.user.firstName} {props.user.lastName}</h1>
                        </Modal.Description>
                        <Image size='medium' src={ico} wrapped className="place_img" />
                    </Modal.Content>
                    <Modal.Actions>
                        <div>
                            <div className="div-ico">
                                <i class="user plus icon i" ></i>
                            </div>
                            <div className="div-ico">
                                <i class="share square icon"></i>
                            </div>
                        </div>

                    </Modal.Actions>

                    <h2 className="place_detailes">

                        <div className="div_all">
                            <i class="phone icon"></i>
                            <div className="place_div">
                                <p> {props.user.phoneNamber}</p>
                            </div>
                        </div>
                        <div className="div_all">
                            <div className="place_div">
                                <i class="envelope icon"></i>
                                <p><a href="mailto:abc@example.com?subject = Feedback&body = Message">{props.user.email}</a></p>
                            </div>
                        </div>
                        <div className="div_all">
                            <i class="map marker alternate icon"></i>
                            <div className="place_div"> <p> {props.user.adress}</p> </div>
                        </div>
                    </h2>
                </Modal>
            </List.Content>
        </List.Item>
        // style={{ textDecoration: 'none', color: 'black' }}

    );
    // </Link>
}
const mapStateToProps = (state) => {

    return { ColorFirstName: state.usersPart.ColorFirstName, ColorLastName: state.usersPart.ColorLastName };
}
export default connect(mapStateToProps, { SelectedUser, ChangeColorFirstName, ChangeColorLastName })(User);


