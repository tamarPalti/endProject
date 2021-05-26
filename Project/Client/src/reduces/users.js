import * as actionTypes from '../ActionTypes'
const initialUsers = {
    AllUsers: [],
    UserSearch: null,
    SelectedUser: null
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
    }
    return state;
}
