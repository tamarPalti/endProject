import { connect } from "react-redux";
import './User.scss';
import { SelectedUser, ChangeColorFirstName, ChangeColorLastName } from '../../actions/index';
import { useRef, useEffect } from "react";
import ico from './img/alex.png';
import React, { useState } from 'react';
import { AddHistory, GetImage } from '../../util/index';
import { Button, Image, Modal, List } from 'semantic-ui-react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { SendMail, GetCurrentUser } from '../../util';


const User = (props) => {
    const { url, path } = useRouteMatch();

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

    function myFunction() {
        var myWindow = window.open(url + "/TasksUpdataUser/" + props.user._id, "UpdataUser", "width=400,height=300");
    }

    const [open, setOpen] = React.useState(false)

    const SendMailFunc = (user) => {

        GetCurrentUser().then(succ => {

            let mail = {
                toUser: user.email,
                subject: `${succ.data.firstName + " " + succ.data.lastName} חיפש אותך `,
                text: `<div>לשליחת מייל ${succ.data.email}</div> `
            }

            SendMail(mail);
        })



    }
    return (



        
        <List.Item key={props.user._id}>
            <List.Content floated='right'>
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<div ><div className="place_user" onClick={() => {

                        props.SelectedUser(props.user);

                        if (props.ifAdd == "true")
                            AddHistory(localStorage.getItem("currentUserId"), props.user._id);

                        if (props.user.ifMessege) {
                            console.log(props.user.ifMessege);
                            SendMailFunc(props.user);
                        }

                    }}>
                        <img className="img_ico" alt="Avatar" src={props.user.img ? props.user.img : ico}></img>

                            <p className="display"style={{"margin-left": "1.5em"}}>{checkName(props.user.lastName) ? Laststart : Lastend}</p>
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
                 
                    </div>

                    </div>}
                >
                    <div className="div_content">

                        <div className="name_user">
                            <p className="place_name">{props.user.firstName} {props.user.lastName}</p>
                        </div>
                        <div className="img_user">
                            <Image size='medium' src={props.user.img ? props.user.img : ico} wrapped className="place_img" />
                        </div>

                    </div>
                    <Modal.Actions>
                        <div>
                            <div className="div-ico" data-tooltip="הוסף לאנשי קשר">
                                <i class="user plus icon i" ></i>
                            </div>
                            <div className="div-ico" data-tooltip="דווח על תקלה">
                                <i class="exclamation triangle icon" onClick={myFunction}></i>
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


