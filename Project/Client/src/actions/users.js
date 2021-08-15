import axios from 'axios';
import * as actionTypes from '../ActionTypes'

export const GetAllUsers = () => {
    return (dispatch) => {
        axios.get("http://localhost:4000/users").then(succ => {
            console.log(succ.data);
            dispatch(SaveAllUsers(succ.data));
        }).catch(ee => {
            console.log(ee.massege);
        });
    }
}
export const GetCurrentUser = (user) => {
    return async (dispatch) => {
        // { params: { password: user.password,mail:user.mail } }
        let succ = await axios.get(`http://localhost:4000/users/getByPassword/${user.password}&${user.mail}`);

        // if (succ.status==200)

        if (typeof (succ.data) != "string")
            dispatch(SignIn(succ.data));

    }
}
export const AddUser = (user) => {
    return (dispatch) => {
        axios.post("http://localhost:4000/users", user).then((succ) => {
            console.log(succ.data);
            if (succ.data != null) {
                dispatch(SignIn(succ.data));
                dispatch(IfExist(false));
                dispatch(ErrorInAdd(false));
            }

        }).catch(ee => {
            console.log(ee.massege);
            if (ee.response.status == 404) {
                dispatch(IfExist(true));
                dispatch(ErrorInAdd(false));
            }

            if (ee.response.status == 400) {
                dispatch(ErrorInAdd(true));
                dispatch(IfExist(false));
            }

        });
    }
}
export const SearchUsers = (user, allUsers) => {
    return (dispatch) => {
        let firstName = user.firstName || "";
        let lastName = user.lastName || "";
        let phoneNamber = user.phoneNamber || "";
        let email = user.email || "";
        let adress = user.adress || "";
        let users = allUsers.filter((u) => {
            return u.firstName.includes(firstName) && u.lastName.includes(lastName)
                && u.email.includes(email) && u.adress.includes(adress) && u.phoneNamber.filter((e) => e.includes(phoneNamber)).length > 0
        });
        dispatch(SaveResultUsers(users));
    }

}

export const SaveAllUsers = (users) => {
    return {
        type: actionTypes.FILL_ALL_USERS,
        payload: users
    }
}
export const SaveResultUsers = (users) => {
    return {
        type: actionTypes.REFRESH_RESULT,
        payload: users
    }
}

export const SelectedUser = (user) => {
    return {
        type: actionTypes.SELECTED_USER,
        payload: user
    }
}
export const NoSelectedUser = () => {
    return {
        type: actionTypes.SELECTED_USER,
        payload: null
    }
}
export const DeleteResultUser = () => {
    return {
        type: actionTypes.DELETE_RESULT_USER,
        payload: null
    }
}

export const ChangeColorFirstName = (name) => {
    return {
        type: actionTypes.CHANGE_COLOR_FIRST_NAME,
        payload: name
    }
}
export const ChangeColorLastName = (name) => {
    return {
        type: actionTypes.CHANGE_COLOR_LAST_NAME,
        payload: name
    }
}
export const SignIn = (user) => {
    return {
        type: actionTypes.SING_IN,
        payload: user
    }
}
export const SignOut = () => {
    return {
        type: actionTypes.SING_OUT,
        payload: null
    }
}

export const IfExist = (ifExist) => {
    return {
        type: actionTypes.IF_EXIST,
        payload: ifExist
    }
}
export const ErrorInAdd = (ifErrorInAdd) => {
    return {
        type: actionTypes.IF_ERROR_IN_ADD,
        payload: ifErrorInAdd
    }
}