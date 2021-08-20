import axios from 'axios';

export const GetCurrentBuisness = async (id) => {
    return axios.get(`http://localhost:4000/business/${id}`);
}
export const UpdateBuisnessFunc = async (id, data) => {
    axios.put(`http://localhost:4000/business/${id}`, data).then(succ => {
        return succ;
    })
}
export const DeleteHistoryBusiness = async (index) => {
    return axios.put(`http://localhost:4000/users/deleteHistoryBusiness/${localStorage.getItem("currentUserId")}&${index}`);
}

export const GetAllBuisnessOfUser = async () => {
    return axios.get(`http://localhost:4000/business/getListBuisnessByIdUser/${localStorage.getItem("currentUserId")}`);
}
export const AddBusiness = async (business) => {
    return axios.post("http://localhost:4000/business", business);
}