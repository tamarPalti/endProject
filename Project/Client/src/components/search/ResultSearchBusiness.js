import Business from "./Business";
import { connect } from "react-redux";
import { List } from 'semantic-ui-react'
import { GetCurrentUser } from '../../actions/index';
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";
import React, { Component, useEffect, useState } from 'react';
import { FromAddress } from '../../util';
import GeolocationService from '../../services/SortService';


import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


const ResultSearchBusiness = (props) => {



    //styles
    const styleListItem = { "height": "35%", "border-bottom-style": "groove", "max-width": "max-width: 100%" }

    useEffect(() => {
    }, [props.BusinessSearch]);

    return (<>

        {
            <Box sx={{ width: '100%', height: 250, bgcolor: 'background.paper' }}>

                {props.BusinessSearch && props.BusinessSearch.map((item,index) => {
                    return (

                        <ListItem key={index} component="div" disablePadding style={styleListItem}>
                            <ListItemButton style={{ "height": "100%" }}>
                                <Business ifAdd="true" key={item._id} business={item} />
                            </ListItemButton>
                        </ListItem>

                    );
                })}
                
            </Box>}

    </>);
}
const mapStateToProps = (state) => {

    return { CurrentUser: state.usersPart.CurrentUser, BusinessSearch: state.businessPart.BusinessSearch };
}
export default connect(mapStateToProps, { GetCurrentUser })(ResultSearchBusiness); 