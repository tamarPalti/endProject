import 'react-bootstrap';
import { GetAllUsers, SaveResultUsers, SearchUsers } from '../../actions/index';
import user from '../classes/user';
import { useEffect, useState, useRef } from 'react';
import { connect } from "react-redux";
const UsersSearch = (props) => {

    let firstName = useRef();
    let lastName = useRef();
    let phoneNamber = useRef();
    let email = useRef();
    let adress = useRef();

    // props.AllUsers פעם ראשונה שמבקר באתר נשלף כל המשתמשים למערך
    if (props.AllUsers.length == 0)
        props.GetAllUsers();
    // props.UserSearch פעם ראשונה שמבקר בקומפוננטה מועתק כל המשתמשים ממערך props.AllUsers למערך
    if (props.UserSearch == null)
        props.SaveResultUsers(props.AllUsers);

    // פונקצית חיפוש Users
    const searchUsers = () => {

        let User = new user();
        User.firstName = firstName.current.value;
        User.lastName = lastName.current.value;
        User.phoneNamber = phoneNamber.current.value;
        User.email = email.current.value;
        User.adress = adress.current.value;
        props.SearchUsers(User, props.AllUsers);
    }

    // useEffect(() => {

    // }, []);
    return (<>
        <form className="ui form">
            <div className="ui form">
                <div className="two fields">
                    <div className="field">
                        <label>First Name</label>
                        <input placeholder="First Name" ref={firstName} type="text" onKeyUp={searchUsers} />
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input placeholder="Last Name" ref={lastName} type="text" onKeyUp={searchUsers} />
                    </div>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" placeholder="Email" ref={email} onKeyUp={searchUsers} />
                </div>
                <div className="two fields">
                    <div className="field">
                        <label>Phone Number</label>
                        <input placeholder="Phone Number" ref={phoneNamber} type="number" onKeyUp={searchUsers} />
                    </div>
                    <div className="field">
                        <label>Address</label>
                        <input placeholder="Address" ref={adress} type="text" onKeyUp={searchUsers} />
                    </div>
                </div>
            </div>
        </form>
    </>);
}
const mapStateToProps = (state) => {

    return { AllUsers: state.usersPart.AllUsers, UserSearch: state.usersPart.UserSearch };
}
export default connect(mapStateToProps, { GetAllUsers, SaveResultUsers, SearchUsers })(UsersSearch);