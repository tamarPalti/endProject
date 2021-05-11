import * as actionTypes from '../ActionTypes'
const initialUsers = {
    IfShowSearch: true
}
export const globalReducer = (state = initialUsers, action) => {
    switch (action.type) {
        case actionTypes.IF_SHOW_SEARCH:
            return{
                ...state,
                IfShowSearch:action.payload
            }
    }
    return state;
}
