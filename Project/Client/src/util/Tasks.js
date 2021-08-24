import axios from 'axios';


export const GetAllTask = async () => {
    return axios.get(`http://localhost:4000/tasks/getAllTask`);
}
export const GetAllTypeTsks = async () => {
    return axios.get(`http://localhost:4000/tasks/getAllTypeTsks`);
}