import axios from 'axios';

export const GetCurrentBuisness = async (id) => {
    return axios.get(`http://localhost:4000/business/${id}`);
}
export const UpdateBuisnessFunc = async (id, data) => {
    axios.put(`http://localhost:4000/business/${id}`, data).then(succ => {
        return succ;
    })

}
