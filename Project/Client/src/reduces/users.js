import * as actionTypes from '../ActionTypes'
const initialUsers = {
    AllUsers: [],
    UserSearch: null,
    SelectedUser: null,
    ColorFirstName: "",
    ColorLastName: "",
    CurrentUser: null,
    SingUp: false
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
        case actionTypes.CHANGE_COLOR_FIRST_NAME:
            return {
                ...state,
                ColorFirstName: action.payload
            }
        case actionTypes.CHANGE_COLOR_LAST_NAME:
            return {
                ...state,
                ColorLastName: action.payload
            }
        case actionTypes.SING_IN:
            localStorage.setItem("currentUser", null);
            localStorage.setItem("currentUserPassword", action.payload.password);
            localStorage.setItem("currentUserMail", action.payload.email );

            return {
                ...state,
                CurrentUser: action.payload
            }


        case actionTypes.SING_OUT:
            localStorage.setItem("currentUser",null);
            return {
                ...state,
                CurrentUser: null
            }




    }
    return state;
}
