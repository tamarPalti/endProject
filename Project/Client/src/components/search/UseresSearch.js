import 'react-bootstrap';
import { GetAllUsers, SaveResultUsers } from '../../actions/index';
import { useEffect } from 'react';
import { connect } from "react-redux";
const UsersSearch = (props) => {
    if (props.AllUsers.length == 0)
        props.GetAllUsers();
    props.SaveResultUsers(props.AllUsers);
    // useEffect(() => {


    // }, []);
    return (<>
        <form className="ui form">
            <div className="ui form">
                <div className="two fields">
                    <div className="field">
                        <label>First Name</label>
                        <input placeholder="First Name" type="text" />
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input placeholder="Last Name" type="text" />
                    </div>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" placeholder="Email" />
                </div>
                <div className="two fields">
                    <div className="field">
                        <label>Phone Number</label>
                        <input placeholder="Phone Number" type="number" />
                    </div>
                    <div className="field">
                        <label>Address</label>
                        <input placeholder="Address" type="text" />
                    </div>
                </div>
            </div>
        </form>
    </>);
}
const mapStateToProps = (state) => {

    return { AllUsers: state.usersPart.AllUsers };
}
export default connect(mapStateToProps, { GetAllUsers, SaveResultUsers })(UsersSearch);