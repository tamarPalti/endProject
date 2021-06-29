import "./UserDetailes.scss";
import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom';
import { NoSelectedUser } from '../../actions/index';
import { useEffect, useState } from "react";
import { ChangeColorFirstName, ChangeColorLastName } from '../../actions/index';
import ico from './img/alex.png'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetailes = (props) => {
  const { id } = useParams();
  const [user, setuser] = useState(null);

  useEffect(() => {
    GetUserById(id);
    // return (
    //   props.ChangeColorFirstName(''),
    //   props.ChangeColorLastName('')
    // )
  }, []);

  const GetUserById = (idUser) => {
    axios.get("http://localhost:4000/users/" + idUser).then(succ => {
      console.log(succ.data);
      setuser(succ.data);
    }).catch(ee => {
      console.log(ee.massege);
    });
  }


  return (
    <>
      <Link to='/search/users'><button class="ui teal button MyButton">חזרה</button></Link>
      <h2 class="ui center aligned icon header">
        <img className="profil_img" src={ico}></img>
        {user &&
          <>
            <p>{user.firstName} {user.lastName}</p>
            <p> {user.phoneNamber}</p>
            <p><a href="mailto:abc@example.com?subject = Feedback&body = Message">{user.email}</a></p>
            <p> {user.adress}</p>
          </>}
        {/* <p> {props.SelectedUser.img}</p> */}
      </h2>
    </>
  );
}
const mapStateToProps = (state) => {
  return { SelectedUser: state.usersPart.SelectedUser };
}
export default connect(mapStateToProps, { NoSelectedUser, ChangeColorFirstName, ChangeColorLastName })(UserDetailes); 
console.log("ddddd");