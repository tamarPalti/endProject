import axios from 'axios';

export const getAllCategories = async () => {
   return axios.get("http://localhost:4000/categories");
}