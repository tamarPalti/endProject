import "./UserDetailes.scss";
import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom';
import { NoSelectedBusiness } from '../../actions/index';
import { useEffect, useState } from "react";
import { ChangeColorName} from '../../actions/index';
import ico from './img/alex.png'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BusinessDetailes = (props) => {
  const { id } = useParams();
  const [business, setbusiness] = useState(null);

  useEffect(() => {
    GetBusinessById(id);
    // return (
    //   props.ChangeColorName('')
    // )
  }, []);

  const GetBusinessById = (idBusiness) => {
    axios.get("http://localhost:4000/business/" + idBusiness).then(succ => {
      console.log(succ.data);
      setbusiness(succ.data);
    }).catch(ee => {
      console.log(ee.massege);
    });
  }


  return (
    <>
      <Link to='/search/business'><button class="ui teal button MyButton">חזרה</button></Link>
      <h2 class="ui center aligned icon header">
        <img className="profil_img" src={ico}></img>
        {business &&
          <>
            <p>{business.name}</p>
            <p> {business.phoneNamber}</p>
            <p><a href="mailto:abc@example.com?subject = Feedback&body = Message">{business.email}</a></p>
            <p> {business.adress}</p>
          </>}
        {/* <p> {props.SelectedUser.img}</p> */}
      </h2>
    </>
  );
}
const mapStateToProps = (state) => {
  return { SelectedBusiness: state.businessPart.SelectedBusiness };
}
export default connect(mapStateToProps, { NoSelectedBusiness, ChangeColorName })(BusinessDetailes); 
