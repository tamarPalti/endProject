import * as actionTypes from '../ActionTypes';
import GeolocationService from '../services/SortService';
import Geocode from "react-geocode";
import { FromAddress } from '../util';


const initialBusiness = {
    AllBusiness: [],
    BusinessSearch: [],
    SelectedBusiness: null,
    ColorName: "",
    updateBuisness: null
}
export const businessReducer =  (state = initialBusiness, action) => {
     switch (action.type) {
        case actionTypes.FILL_ALL_BUSINESS:

            // const places = [];
            // let place = {};
            // let sorted = [];
            // let loc = {};

            // await navigator.geolocation.getCurrentPosition(

            //     async  arr => {

            //         place = arr;

            //         for (let index = 0; index < action.payload.length; index++) {
            //             console.log(action.payload[index]);

            //             await FromAddress(action.payload[index].adress).then(Address => places.push(Address))
            //                 .catch(error => console.log("לא נמצא כתובת " + action.payload[index].adress));
            //         }

            //         let arrSort = await GeolocationService.beginSort(
            //             loc ? loc.results[0].geometry.location.lat : place.coords.latitude,
            //             loc ? loc.results[0].geometry.location.lng : place.coords.longitude,
            //             places
            //         );

            //         sorted = arrSort.map((location) => action.payload[location.index]);
            //     }
            // )






            return {
                ...state,
                AllBusiness: action.payload
            };

            
        case actionTypes.REFRESH_RESULT_BUSINESS:
            return {
                ...state,
                BusinessSearch: action.payload
            }
        case actionTypes.DELETE_RESULT_BUSINESS:
            return {
                ...state,
                BusinessSearch: action.payload
            }
        case actionTypes.SELECTED_BUSINESS:
            return {
                ...state,
                SelectedBusiness: action.payload
            }
        // case actionTypes.NO_SELECTED_USER:
        //     return {
        //         ...state,
        //         SelectedUser: action.payload
        //     }
        case actionTypes.CHANGE_COLOR_NAME:
            return {
                ...state,
                ColorName: action.payload
            }
        case actionTypes.UPDATE_BUISNESS:
            return {
                ...state,
                updateBuisness: action.payload
            }

    }
    return state;
}
