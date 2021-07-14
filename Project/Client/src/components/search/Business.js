import { connect } from "react-redux";
import './Business.scss';
import { SelectedBusiness, ChangeColorName } from '../../actions/index';
import { useRef, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, Image, Modal,List } from 'semantic-ui-react'
import ico from './img/alex.png'
const Business = (props) => {

    const [open, setOpen] = useState(false)

    let indexName = props.business.name.indexOf(props.ColorName);
    let start = props.business.name.substring(0, indexName);
    let end = props.business.name.substring(indexName + props.ColorName.length, props.business.name.length);
    const checkName = (name) => {
        return name[0] >= 'A' && name[0] <= 'Z' || name[0] >= 'a' && name[0] <= 'z';
    }
    useEffect(() => {

    }, []);
    return (
        <List.Item key={props.business._id}>
            <List.Content floated='right'>
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<div>
                        <div className="place_business" onClick={() => props.SelectedBusiness(props.business)}>
                            <p className="display">&nbsp;</p>
                            <p className="display">{checkName(props.business.name) ? start : end}</p>
                            {!checkName(props.business.name) && (end[0] == ' ' || props.ColorName[props.ColorName.length - 1] == ' ') ? <p className="display">&nbsp;</p> : null}

                            <p className="color_name display">{props.ColorName}</p>
                            {checkName(props.business.name) && (end[0] == ' ' || props.ColorName[props.ColorName.length - 1] == ' ') ? <p className="display">&nbsp;</p> : null}

                            <p className="display">{checkName(props.business.name) ? end : start}</p>
                            <img className="img_ico" src={ico}></img>
                        </div>
                    </div>}
                >
                    {/* <Modal.Content image>
                        <Modal.Description  > */}
                            <h1 className="place_name_b">{props.business.name}</h1>
                        {/* </Modal.Description> */}
                        <Image size='medium' src={ico} wrapped className="place_img_b" />
                    {/* </Modal.Content> */}
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
                                <p> {props.business.phoneNamber}</p>
                            </div>
                        </div>
                        <div className="div_all">
                            <div className="place_div">
                                <i class="envelope icon"></i>
                                <p><a href="mailto:abc@example.com?subject = Feedback&body = Message">{props.business.email}</a></p>
                            </div>
                        </div>
                        <div className="div_all">
                            <i class="map marker alternate icon"></i>
                            <div className="place_div"> <p> {props.business.adress}</p> </div>
                        </div>

                    </h2>
                </Modal>
            </List.Content>
        </List.Item>

    );
}
const mapStateToProps = (state) => {

    return { ColorName: state.businessPart.ColorName };
}
export default connect(mapStateToProps, { SelectedBusiness, ChangeColorName })(Business);
