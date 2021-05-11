import * as actionTypes from '../ActionTypes'
const initialUsers = {
    AllUsers: [],
    UserSearch: null
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
    }
    return state;
}
