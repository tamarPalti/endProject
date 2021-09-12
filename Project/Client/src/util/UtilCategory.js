import axios from 'axios';

export const getAllCategories = async () => {
   return axios.get("http://localhost:4000/categories");
}
export const AddCategory = async (category) => {
   return axios.post("http://localhost:4000/categories",category);
}