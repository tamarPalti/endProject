import axios from 'axios';


export const GetAllTask = async () => {
    return axios.get(`http://localhost:4000/tasks/getAllTask`);
}
export const GetAllTypeTsks = async () => {
    return axios.get(`http://localhost:4000/tasks/getAllTypeTsks`);
}
export const UpdateStatusTask = async (id, status) => {
    axios.put(`http://localhost:4000/tasks/updateStatusTask/${id}/${status}`).then(succ => {
        return succ;
    })
}
export const GetTaskById = async (id) => {
    return axios.get(`http://localhost:4000/tasks/getTaskById/${id}`);
}

export const AddTask = async (task) => {
    return axios.post(`http://localhost:4000/tasks/addTask`,task);
}

