import axios from 'axios';


export const GetAllTask = async () => {
    return axios.get(`http://localhost:4000/tasks/getAllTask`);
}