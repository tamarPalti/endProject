import axios from 'axios';
import * as actionTypes from '../ActionTypes'

export const GetAllBusiness = () => {
    return (dispatch) => {
        axios.get("http://localhost:4000/business").then(succ => {
            console.log(succ.data);
            dispatch(SaveAllBusiness(succ.data));
        }).catch(ee => {
            console.log(ee.massege);
        });
    }
}
export const SearchBusiness = (business, allBusiness) => {
    return (dispatch) => {
        let name = business.name || "";
        let phoneNamber = business.phoneNamber || [];
        let email = business.email || "";
        let adress = business.adress || "";
        let listCategory =  [];
        if (business.listCategory)
            listCategory.push(business.listCategory);
        let businesses = allBusiness.filter((b) => {
            return b.name.includes(name) && (b.listCategory.filter(c=> business.listCategory.indexOf(c) != -1).length>0||listCategory.length==0)
                && b.email.includes(email) && b.adress.includes(adress) && b.phoneNamber.filter((e) => e.includes(phoneNamber)).length > 0
        });
        dispatch(SaveResultBusiness(businesses));
    }

}

export const SaveAllBusiness = (business) => {
    return {
        type: actionTypes.FILL_ALL_BUSINESS,
        payload: business
    }
}
export const SaveResultBusiness = (business) => {
    return {
        type: actionTypes.REFRESH_RESULT_BUSINESS,
        payload: business
    }
}

export const SelectedBusiness = (business) => {
    return {
        type: actionTypes.SELECTED_BUSINESS,
        payload: business
    }
}
export const NoSelectedBusiness = () => {
    return {
        type: actionTypes.SELECTED_BUSINESS,
        payload: null
    }
}
export const DeleteResultBusiness = () => {
    return {
        type: actionTypes.DELETE_RESULT_BUSINESS,
        payload: null
    }
}

export const ChangeColorName = (name) => {
    return {
        type: actionTypes.CHANGE_COLOR_NAME,
        payload: name
    }
}
