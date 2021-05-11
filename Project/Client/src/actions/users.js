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
export const SaveAllUsers=(users)=>{
  return{
      type:actionTypes.FILL_ALL_USERS,
      payload:users
  }
}
export const SaveResultUsers=(users)=>{
  return{
      type:actionTypes.REFRESH_RESULT,
      payload:users
  }
}
// export const ShowSearch=(ifShow)=>{
//   return{
//       type:actionTypes.IF_SHOW_SEARCH,
//       payload:ifShow
//   }
// }
