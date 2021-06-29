import Business from "./Business";
import { connect } from "react-redux";
const ResultSearchBusiness = (props) => {
    return (<>
    {props.BusinessSearch&&props.BusinessSearch.map((item)=>{
       return(<Business key={item._id} business={item}/>);
    })}
    </>);
}
const mapStateToProps = (state) => {
    return { BusinessSearch: state.businessPart.BusinessSearch };
}
export default connect(mapStateToProps)(ResultSearchBusiness); 