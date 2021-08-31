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


    // Geocode.setApiKey("AIzaSyARe4EGfwVKmSerC4BepoEuPnl6hJ1j6YA");

    // const places = [];
    // const [myarr, setmyarr] = useState();




    useEffect(() => {

        // setmyarr([]);

        // let loc = null;

        // // await FromAddress("פרדו 11 בני ברק").then(l => loc = l);



        // let place = {};

        // await navigator.geolocation.getCurrentPosition(
        //     async  arr => {

        //         place = arr;

        //         for (let index = 0; index < props.BusinessSearch.length; index++) {
        //             console.log(props.BusinessSearch[index]);

        //             await FromAddress(props.BusinessSearch[index].adress).then(Address => places.push(Address))
        //                 .catch(error => console.log("לא נמצא כתובת " + props.BusinessSearch[index].adress));


        //         }

        //         let arrSort = await GeolocationService.beginSort(
        //             loc ? loc.results[0].geometry.location.lat : place.coords.latitude,
        //             loc ? loc.results[0].geometry.location.lng : place.coords.longitude,
        //             places
        //         );
        //         await setmyarr(arrSort);
        //         console.log(arrSort);
        //         console.log(props.coords);
        //     }
        // );



    }, [props.BusinessSearch]);

    return (<>

        {<List divided verticalAlign='middle'>


            {/* {props.BusinessSearch.length != 0 && myarr.map((locationBuisness) => {
                return <Business ifAdd="true" key={props.BusinessSearch[locationBuisness.index]._id} business={props.BusinessSearch[locationBuisness.index]} />
            })} */}

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