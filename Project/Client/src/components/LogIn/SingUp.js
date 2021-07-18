import 'react-bootstrap';
import { GetAllUsers, SaveResultUsers, SearchUsers, DeleteResultUser, ChangeColorFirstName, ChangeColorLastName } from '../../actions/index';
import user from '../classes/user';
import { useEffect, useState, useRef } from 'react';
import { connect } from "react-redux";
import './SingUp.scss';
const SingUp = (props) => {

    let firstName = useRef();
    let lastName = useRef();
    let phoneNamber = useRef();
    let email = useRef();
    let adress = useRef();
    return (<div className="back-singUp">
        <div class="ui small form">
            <div class="two fields">
                <div class="field">
                    <label>First Name</label>
                    <input placeholder="First Name" type="text" />
                </div>
                <div class="field">
                    <label>Last Name</label>
                    <input placeholder="Last Name" type="text" />
                </div>
            </div>
            <div class="two fields">
                <div class="field">
                    <label>Phone</label>
                    <input placeholder="Phone" type="text" />
                </div>
                <div class="field">
                    <label>Mail</label>
                    <input placeholder="Mail" type="text" />
                </div>
            </div>
            <div class="two fields">
                <div class="field">
                    <label>Address</label>
                    <input placeholder="Address" type="text" />
                </div>
                <div class="field">
                    <label>Image</label>
                    <input placeholder="Image" type="text" />
                </div>
            </div>
            <div class="ui submit button">Submit</div>
        </div>
    </div>);
}
const mapStateToProps = (state) => {

    return {};
}
export default connect(mapStateToProps, {})(SingUp);