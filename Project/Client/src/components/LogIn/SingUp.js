import 'react-bootstrap';
import { Button } from 'semantic-ui-react'
import { GetAllUsers, SaveResultUsers, SearchUsers, DeleteResultUser, ChangeColorFirstName, ChangeColorLastName } from '../../actions/index';
import user from '../classes/user';
import { useEffect, useState, useRef } from 'react';
import { connect } from "react-redux";
const SingUp = (props) => {

    let firstName = useRef();
    let lastName = useRef();
    let phoneNamber = useRef();
    let email = useRef();
    let adress = useRef();
    return (<>
        <form className="ui form">
            <div className="ui form">
                <div className="two fields">
                    <div className="field">
                        <label>First Name</label>
                        <input placeholder="First Name" ref={firstName} type="text"/>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input placeholder="Last Name" ref={lastName} type="text" />
                    </div>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" placeholder="Email" ref={email}  />
                </div>
                <div className="two fields">
                    <div className="field">
                        <label>Phone Number</label>
                        <input placeholder="Phone Number" ref={phoneNamber} type="number"  />
                    </div>
                    <div className="field">
                        <label>Address</label>
                        <input placeholder="Address" ref={adress} type="text"  />
                    </div>
                </div>
                <Button content='Login' primary onClick={() => {
           
          }} />
            </div>
        </form>
    </>);
}
const mapStateToProps = (state) => {

    return { };
}
export default connect(mapStateToProps, {  })(SingUp);