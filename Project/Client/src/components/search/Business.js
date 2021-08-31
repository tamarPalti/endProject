import { connect } from "react-redux";
import './Business.scss';
import { SelectedBusiness, ChangeColorName } from '../../actions/index';
import { useRef, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, Image, Modal, List } from 'semantic-ui-react';
import ico from './img/alex.png';
import { AddHistoryBusiness } from '../../util/index';
import { FromAddress } from '../../util/index'
import MyLocation from "./MyLocation";



const Business = (props) => {


    const [Cenetr, SetCenetr] = useState(null);
    const [Txt, SetTxt] = useState(null);
    const [Zoom, SetZoom] = useState(20);











    const [open, setOpen] = useState(false)

    let indexName = props.business.name.indexOf(props.ColorName);
    let start = props.business.name.substring(0, indexName);
    let end = props.business.name.substring(indexName + props.ColorName.length, props.business.name.length);
    const checkName = (name) => {
        return name[0] >= 'A' && name[0] <= 'Z' || name[0] >= 'a' && name[0] <= 'z';
    }
    useEffect(() => {


        FromAddress(props.business.adress).then(response => {

            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat + " " + lng);
            console.log(response.results[0]);
    
            SetCenetr({ lat: lat, lng: lng });
            SetTxt(response.results[0].address_components[0].long_name);
    
        }).catch(error => {
            console.log(error);
        });
    


    }, []);


    return (
        <List.Item key={props.business._id}>
            <List.Content floated='right'>
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<div>
                        <div className="place_business" onClick={() => {
                            props.SelectedBusiness(props.business)
                            if (props.ifAdd == "true")
                                AddHistoryBusiness(localStorage.getItem("currentUserId"), props.business._id)
                        }}>
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
                    <div className="div_content">
                        <div className="name_business">
                            <p className="place_name">{props.business.name}</p>
                        </div>
                        <div className="img_business">
                            <Image size='medium' src={ico} wrapped className="place_img" />
                        </div>
                    </div>
                    <Modal.Actions>
                        <div>
                            <div className="div-ico" data-tooltip="הוסף לאנשי קשר">
                                <i class="user plus icon i" ></i>
                            </div>
                            <div className="div-ico" data-tooltip="דווח על תקלה">
                                <i class="exclamation triangle icon"></i>
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
                            <div className="place_div"> <p> {props.business.adress}</p></div>
                           
                        </div>

                    </h2>
                      {Cenetr && Zoom && Txt && <MyLocation center={Cenetr} zoom={Zoom} txt={Txt} />}
                </Modal>
            </List.Content>
        </List.Item>

    );
}
const mapStateToProps = (state) => {

    return { ColorName: state.businessPart.ColorName };
}
export default connect(mapStateToProps, { SelectedBusiness, ChangeColorName })(Business);
