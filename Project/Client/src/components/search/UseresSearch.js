import 'react-bootstrap';
import { GetAllUsers, SaveResultUsers, SearchUsers } from '../../actions/index';
import user from '../classes/user';
import { useEffect } from 'react';
import { connect } from "react-redux";
const UsersSearch = (props) => {



    let User = new user();
    // props.AllUsers פעם ראשונה שמבקר באתר נשלף כל המשתמשים למערך
    if (props.AllUsers.length == 0)
        props.GetAllUsers();
    // props.UserSearch פעם ראשונה שמבקר בקומפוננטה מועתק כל המשתמשים ממערך props.AllUsers למערך
    if (props.UserSearch == null)
        props.SaveResultUsers(props.AllUsers);

    // פונקצית חיפוש Users
    const searchUsers = (e, mode) => {
        User[mode] = e.target.value;
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
                        <input placeholder="First Name" type="text" onKeyUp={(e) => searchUsers(e, "firstName")} />
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input placeholder="Last Name" type="text" onKeyUp={(e) => searchUsers(e, "lastName")} />
                    </div>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" placeholder="Email" onKeyUp={(e) => searchUsers(e, "email")} />
                </div>
                <div className="two fields">
                    <div className="field">
                        <label>Phone Number</label>
                        <input placeholder="Phone Number" type="number" onKeyUp={(e) => searchUsers(e, "phoneNamber")} />
                    </div>
                    <div className="field">
                        <label>Address</label>
                        <input placeholder="Address" type="text" onKeyUp={(e) => searchUsers(e, "adress")} />
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