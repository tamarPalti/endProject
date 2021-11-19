import axios from 'axios';

export const GetCurrentBuisness = async (id) => {
    return axios.get(`http://localhost:4000/business/${id}`);
}
export const UpdateBuisnessFunc = async (id, business) => {
    return axios({
        method: 'put',
        url: `http://localhost:4000/business/${id}`,
        data: business,
    });
}
export const DeleteHistoryBusiness = async (index) => {
    return axios.put(`http://localhost:4000/users/deleteHistoryBusiness/${localStorage.getItem("currentUserId")}&${index}`);
}

export const GetAllBuisnessOfUser = async () => {
    return axios.get(`http://localhost:4000/business/getListBuisnessByIdUser/${localStorage.getItem("currentUserId")}`);
}
export const AddBusiness = async (business) => {
    // business.name=business.name.trim();
    return axios({
        method: 'post',
        url: "http://localhost:4000/business",
        data: business,
    })
}

export const GetAllBusinessFunc = async (business) => {
    return axios.get("http://localhost:4000/business");
}

export const deleteBuisness = async (id) => {
    return axios.delete(`http://localhost:4000/business/${id}`);
}