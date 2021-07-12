import Business from "./Business";
import { connect } from "react-redux";
import { List } from 'semantic-ui-react'

const ResultSearchBusiness = (props) => {
    return (<>
        <List divided verticalAlign='middle'>
            {props.BusinessSearch && props.BusinessSearch.map((item) => {
                return (<Business key={item._id} business={item} />);
            })}</List>
    </>);
    }
const mapStateToProps = (state) => {
    return {BusinessSearch: state.businessPart.BusinessSearch };
    }
export default connect(mapStateToProps)(ResultSearchBusiness); 