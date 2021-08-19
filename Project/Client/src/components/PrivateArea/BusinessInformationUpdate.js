import ListBuisness from "./UpdateBuisness/ListBuisness";
import UpdateBuisness from "./UpdateBuisness/UpdateBuisnes";
import { useState } from 'react';
import { connect } from "react-redux";
import { ChangeUpdateBuisness } from '../../actions/index'
const BusinessInformationUpdate = (props) => {

    // const [indexUpdate, setindexUpdate] = useState("611b894d578bfc22c4ae1869");

    return (<>
        <ListBuisness/>

    </>);
}

const mapStateToProps = (state) => {

    return { updateBuisness: state.businessPart.updateBuisness };
}
export default connect(mapStateToProps, { ChangeUpdateBuisness })(BusinessInformationUpdate);



