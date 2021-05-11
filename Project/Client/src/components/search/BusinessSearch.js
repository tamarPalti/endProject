import 'react-bootstrap';
import { connect } from "react-redux";
const BusinessSearch = (props) => {
    return (<>
        <form className="ui form">
            <div className="ui form">
                    <div className="field">
                        <label>Name</label>
                        <input placeholder="Name" type="text" />
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
        </form></>);
}

export default BusinessSearch;