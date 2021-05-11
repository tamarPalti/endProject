import User from "./User";
import { connect } from "react-redux";
const ResultSearchUser = (props) => {
    return (<>
    {props.UserSearch.map((item)=>{
       return(<User key={item._id} user={item}/>);
    })}
    </>);
}
const mapStateToProps = (state) => {
    return { UserSearch: state.usersPart.UserSearch };
}
export default connect(mapStateToProps)(ResultSearchUser); 