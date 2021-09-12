import Business from "./Business";
import { connect } from "react-redux";
import { List } from 'semantic-ui-react'
import { GetCurrentUser } from '../../actions/index';
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";
import React, { Component, useEffect, useState } from 'react';
import { FromAddress } from '../../util';
import GeolocationService from '../../services/SortService';

const ResultSearchBusiness = (props) => {

    useEffect(() => {
    }, [props.BusinessSearch]);
    return (<>

        {<List divided verticalAlign='middle'>

            {props.BusinessSearch && props.BusinessSearch.map((item) => {
                return (<Business ifAdd="true" key={item._id} business={item} />);
            })}
        </List>}

    </>);
}
const mapStateToProps = (state) => {

    return { CurrentUser: state.usersPart.CurrentUser, BusinessSearch: state.businessPart.BusinessSearch };
}
export default connect(mapStateToProps, { GetCurrentUser })(ResultSearchBusiness); 