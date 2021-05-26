import "./UserDetailes.scss";
import { connect } from "react-redux";
import { NoSelectedUser } from '../../actions/index';
const UserDetailes = (props) => {
    
    return (
      <>
      <button class="ui teal button MyButton" onClick={props.NoSelectedUser }>חזרה</button>
      <h2 class="ui center aligned icon header">
      <i class="circular users icon"></i>
        <p>{props.SelectedUser.firstName} {props.SelectedUser.lastName}</p> 
        <p> {props.SelectedUser.phoneNamber}</p>
        <p> {props.SelectedUser.email}</p>
        <p> {props.SelectedUser.adress}</p>
        {/* <p> {props.SelectedUser.img}</p> */}
    </h2>
    </>
  );
}
const mapStateToProps = (state) => {
  return { SelectedUser: state.usersPart.SelectedUser };
}
export default connect(mapStateToProps,{NoSelectedUser})(UserDetailes); 
