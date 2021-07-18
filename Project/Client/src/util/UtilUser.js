import axios from 'axios';
export const  GetCurrentUser = async() => {
    if(localStorage.getItem("currentUserMail")!="null") 
    {
       let succ = await axios.get(`http://localhost:4000/users/getByPassword/${localStorage.getItem("currentUserPassword")}&${localStorage.getItem("currentUserMail")}`);
       if (typeof(succ.data)!="string")
        return succ.data;
    }
    return null;
      
}