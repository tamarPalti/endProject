import 'react-bootstrap';
import { GetAllUsers, SaveResultUsers, SearchUsers, DeleteResultUser, ChangeColorFirstName, ChangeColorLastName } from '../../actions/index';
import user from '../classes/user';
import { useEffect, useState, useRef } from 'react';
import { connect } from "react-redux";
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import ResultSearchUser from './ResultSearchUser';
import { SendMail } from '../../util/index';

const UsersSearch = (props) => {

    const send = (mail) => {
        let Email = {
            toUser: mail,
            subject: "הצטרפות לאתר מי מייל",
            text: `<h1>${"הצטרפות לאתר מי מייל"}</h1>`
        }
        SendMail(Email);
    }
    function validateEmail(email) {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
    }

    let firstName = useRef();
    let lastName = useRef();
    let phoneNamber = useRef();
    let email = useRef();
    let adress = useRef();

    // props.AllUsers פעם ראשונה שמבקר באתר נשלף כל המשתמשים למערך
    if (props.AllUsers.length == 0)
        props.GetAllUsers();


    // פונקצית חיפוש Users
    const searchUsers = () => {

        let User = new user();
        User.firstName = firstName.current.value;
        User.lastName = lastName.current.value;
        User.phoneNamber = phoneNamber.current.value;
        User.email = email.current.value;
        User.adress = adress.current.value;

        if (User.firstName || User.lastName || User.phoneNamber || User.email || User.adress) {
            props.ChangeColorFirstName(User.firstName);
            props.ChangeColorLastName(User.lastName);
            if (User.email && validateEmail(User.email) && !props.AllUsers.find((item) => item.email == User.email))
                send(User.email)
            props.SearchUsers(User, props.AllUsers);
        }
        else
            props.SaveResultUsers([]);

    }

    const styleDivInput = { "width": "40%" }
   
    const borderR_right = { "border-radius": "8.285714rem" ,"line-height": "1.5em","margin-left": "2%","border-color": "#726363","border-width":"2px"}
    const borderR_left = { "border-radius": "8.285714rem" ,"line-height": "1.5em","border-color": "#726363","border-width":"2px"}

    useEffect(() => {
    }, []);


    return (<>
        {<form className="ui form">
            <div className="ui form">
                <div className="two fields">
                  

                    <div class="ui icon input" style={styleDivInput}>

                        <input type="text" placeholder="First Name" ref={firstName} onKeyUp={searchUsers}
                            style={borderR_left} />
                        <i class="user icon"></i>

                    </div>

                 

                    <div class="ui icon input" style={styleDivInput}>

                        <input type="text" placeholder="Last Name" ref={lastName} onKeyUp={searchUsers}
                            style={borderR_right} />
                        <i class="user icon"></i>

                    </div>


                </div>

                
          

                <div class="ui icon input" style={{ "width": "81.8%" ,"margin-left": "-7.5px","margin-top": "19px"}}>

                    <input type="text" placeholder="Email" ref={email} onKeyUp={searchUsers}
                        style={borderR_left} />
                    <i class="at icon"></i>

                </div>


                <div className="two fields" style={{"margin-top": "32px"}}>

           

                    <div class="ui icon input" style={styleDivInput}>

                        <input type="number" placeholder="Phone Number" ref={phoneNamber} onKeyUp={searchUsers}
                            style={borderR_left} />
                        <i class="phone icon"></i>

                    </div>

               

                    <div class="ui icon input" style={styleDivInput}>

                        <input type="text" placeholder="Address" ref={adress} onKeyUp={searchUsers}
                            style={borderR_right} />
                        <i class="map marker alternate icon"></i>

                    </div>

                </div>
            </div>
        </form>
        }
    </>);
}
const mapStateToProps = (state) => {

    return { CurrentUser: state.usersPart.CurrentUser, AllUsers: state.usersPart.AllUsers, UserSearch: state.usersPart.UserSearch };
}
export default connect(mapStateToProps, { GetAllUsers, SaveResultUsers, SearchUsers, DeleteResultUser, ChangeColorFirstName, ChangeColorLastName })(UsersSearch);