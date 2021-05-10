import * as actionTypes from '../ActionTypes'
const initialUsers = {
    UsersListResult: null,
    IfShowSearch: true
}
export const usersReducer = (state = initialUsers, action) => {
    switch (action.type) {
        case actionTypes.IF_SHOW_SEARCH:
            return{
                ...state,
                IfShowSearch:action.payload
            }
    }
    return state;
}
