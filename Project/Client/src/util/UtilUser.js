import axios from 'axios';
export const GetCurrentUser =async () => {
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