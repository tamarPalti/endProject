import axios from 'axios';
import Geocode from "react-geocode";

export const GetCurrentUser = async () => {
    return axios.get(`http://localhost:4000/users/${localStorage.getItem("currentUserId")}`);
}
export const AddHistory = async (currentId, userId) => {

    axios.put(`http://localhost:4000/users/addToHistory/${currentId}&${userId}`);

}
export const AddHistoryBusiness = async (currentId, businessId) => {

    axios.put(`http://localhost:4000/users/addToHistoryBusiness/${currentId}&${businessId}`);

}
export const AddUser = async (user) => {
    return axios.post("http://localhost:4000/users", user)
}

export const DeleteHistoryUsers = async (index) => {
    return axios.put(`http://localhost:4000/users/deleteHistoryUser/${localStorage.getItem("currentUserId")}&${index}`);
}
export const UpdateUser = async (user) => {
    return axios.put(`http://localhost:4000/users/${localStorage.getItem("currentUserId")}`, user);
}








// export const ChangeAdrres = async (address,setLen,setLet) => {
//     let location;
//     Geocode.fromAddress(address).then(
//         (response) => {
//             const { lat, lng } = response.results[0].geometry.location;
//             console.log(lat, lng);
//             // location = {
//             //     "latitude":lat,
//             //     "longitude": lng
//             // }
//             setLet(lat);
//             setLen(lng)
//             return location
//         },
//         (error) => {
//             console.error(error);
//         }
//     );
// }

