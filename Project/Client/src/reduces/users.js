import * as actionTypes from '../ActionTypes'
const initialUsers = {
    AllUsers: [],
    UserSearch: null,
    SelectedUser: null,
    ColorName: ""
}
export const usersReducer = (state = initialUsers, action) => {
    switch (action.type) {
        case actionTypes.FILL_ALL_USERS:
            return {
                ...state,
                AllUsers: action.payload
            };
        case actionTypes.REFRESH_RESULT:
            return {
                ...state,
                UserSearch: action.payload
            }
        case actionTypes.DELETE_RESULT_USER:
            return {
                ...state,
                UserSearch: action.payload
            }
        case actionTypes.SELECTED_USER:
            return {
                ...state,
                SelectedUser: action.payload
            }
        case actionTypes.NO_SELECTED_USER:
            return {
                ...state,
                SelectedUser: action.payload
            }
        case actionTypes.CHANGE_COLOR_NAME:
            return {
                ...state,
                ColorName: action.payload
            }

    }
    return state;
}
