import ListBuisness from "./UpdateBuisness/ListBuisness";
import { useState } from 'react';
import { connect } from "react-redux";
import { ChangeUpdateBuisness } from '../../actions/index';


const BusinessInformationUpdate = (props) => {


    return (<>
        <ListBuisness/>

    </>);
}

const mapStateToProps = (state) => {

    return { updateBuisness: state.businessPart.updateBuisness };
}
export default connect(mapStateToProps, { ChangeUpdateBuisness })(BusinessInformationUpdate);



