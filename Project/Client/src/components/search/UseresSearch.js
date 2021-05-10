import 'react-bootstrap'
const UsersSearch = (props) => {
    return (<>
         <form className="ui form">
            <div class="ui form">
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
                <div class="field">
                    <label>Email</label>
                    <input type="text" placeholder="Email" />
                </div>
                <div class="two fields">
                    <div class="field">
                        <label>Phone Number</label>
                        <input placeholder="Phone Number" type="number" />
                    </div>
                    <div class="field">
                        <label>Address</label>
                        <input placeholder="Address" type="text" />
                    </div>
                </div>
            </div>
        </form>
    </>);
}

export default UsersSearch;