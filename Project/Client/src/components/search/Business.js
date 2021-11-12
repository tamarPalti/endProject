import { connect } from "react-redux";
import './Business.scss';
import { SelectedBusiness, ChangeColorName } from '../../actions/index';
import { useRef, useEffect, useState } from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { Button, Image, Modal, List } from 'semantic-ui-react';
import ico from './img/person.png';
import { AddHistoryBusiness } from '../../util/index';
import { FromAddress } from '../../util/index'
import MyLocation from "./MyLocation";
import UpdataBusiness from '../Tasks/UpdataBusiness'
import RoomIcon from '@mui/icons-material/Room';

const Business = (props) => {


    const { url, path } = useRouteMatch();


    const [Cenetr, SetCenetr] = useState(null);
    const [Txt, SetTxt] = useState(null);
    const [Zoom, SetZoom] = useState(15);











    const [open, setOpen] = useState(false);

    //styles

    const styleDivContent = { "margin-top": "0", "border-top-right-radius": 0, "border-top-left-radius": 0 }
    const styleDivW = { "position": "relative", "top": "74%" }
    const styleAction = { "height": "3em", "margin-top": "-7%" }
    const styleIconUser = { "margin-left": "-2em", "color": "white" }
    const styleImg = {
        "display": "block", "max-width": "100%", "height": "7em", "width": "100%", "position": "relative", "top": "3em", "left": "-3em"
    }
    
    const styleIconExport = { "margin-left": "3em", "color": "white" }
   
    //styles

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
            // SetTxt(RoomIcon);
            SetTxt(response.results[0].address_components[0].long_name);

        }).catch(error => {
            console.log(error);
        });



    }, []);

    function myFunction() {
        var myWindow = window.open(url + "/TasksUpdataBusiness/" + props.business._id, "updataBusiness", "width=400,height=300");
        localStorage.setItem("idBusinesSearch",props.business._id);
    }

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
                                AddHistoryBusiness(localStorage.getItem("currentUserId"), props.business._id);
                        }}>

                            <img className="img_ico" src={props.business.img && props.business.img !== "undefined"? props.business.img : ico}></img>

                            <p className="display" style={{ "margin-left": "1.5em" }}>&nbsp;</p>
                            <p className="display">{checkName(props.business.name) ? start : end}</p>
                            {!checkName(props.business.name) && (end[0] == ' ' || props.ColorName[props.ColorName.length - 1] == ' ') ? <p className="display">&nbsp;</p> : null}

                            <p className="color_name display">{props.ColorName}</p>
                            {checkName(props.business.name) && (end[0] == ' ' || props.ColorName[props.ColorName.length - 1] == ' ') ? <p className="display">&nbsp;</p> : null}

                            <p className="display">{checkName(props.business.name) ? end : start}</p>
                      
                        </div>

                    </div>}
                >
                    <div className="div_content" style={styleDivContent}>

                        <div className="div_w" style={styleDivW}></div>

                    </div>

                    <Modal.Actions style={styleAction}>

                        <div style={{ "margin-top": "-34.3%" }}>

                            <div className="div-ico" style={{ "margin-right": "-8%" }} data-tooltip="הוסף לאנשי קשר">

                                <i class="user plus icon i" style={styleIconUser}></i>

                            </div>

                            <div className="img_business">

                                <Image size='medium' style={styleImg} src={props.business.img ? props.business.img : ico} wrapped className="place_img" />

                            </div>

                            <div className="div-ico" data-tooltip="דווח על תקלה">

                                <i class="exclamation triangle icon" style={styleIconExport} onClick={myFunction}></i>

                            </div>

                        </div>

                    </Modal.Actions>

                    <h2 className="place_detailes" style={{ "margin-top": "18%" }}>

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

                    {Cenetr && Zoom && Txt && <MyLocation center={Cenetr} zoom={Zoom} txt={Txt} icon={RoomIcon}/>}
             
                </Modal>
            </List.Content>
        </List.Item>

    );
}
const mapStateToProps = (state) => {

    return { ColorName: state.businessPart.ColorName };
}
export default connect(mapStateToProps, { SelectedBusiness, ChangeColorName })(Business);
