import axios from 'axios';
import Geocode from "react-geocode";
export const GetCurrentUser = async () => {
    // if (localStorage.getItem("currentUserMail") != "null")
    //     return { "password": localStorage.getItem("currentUserPassword"), "mail": localStorage.getItem("currentUserMail") }
    // else
    //     return null;
    if (localStorage.getItem("currentUserMail") != "null") {
        let password = localStorage.getItem("currentUserPassword");
        let mail = localStorage.getItem("currentUserMail");
        let scs;
        return await axios.get(`http://localhost:4000/users/getByPassword/${password}&${mail}`);
        // .then(
        //     scss => {
        //         scs = scss
        //         if (typeof (scs.data) != "string")
        //             return scs.data;
        //         else
        //             return null;
        //     }
        // );

    }
    return null;

}
export const AddHistory = async (currentId, userId) => {

    axios.put(`http://localhost:4000/users/addToHistory/${currentId}&${userId}`);

}
export const AddHistoryBusiness = async (currentId, businessId) => {

    axios.put(`http://localhost:4000/users/addToHistoryBusiness/${currentId}&${businessId}`);

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

