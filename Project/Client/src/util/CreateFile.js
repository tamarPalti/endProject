import axios from 'axios';
export const createVCFFile = (user) => {
   return axios.post("http://localhost:4000/vcfFile/createVCFFile", user);
}