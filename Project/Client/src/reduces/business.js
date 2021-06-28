import * as actionTypes from '../ActionTypes';
const initialBusiness = {
    AllBusiness: [],
    BusinessSearch: null,
    SelectedBusiness: null,
    ColorName: ""
}
export const businessReducer = (state = initialBusiness, action) => {
    switch (action.type) {
        case actionTypes.FILL_ALL_BUSINESS:
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

    }
    return state;
}
