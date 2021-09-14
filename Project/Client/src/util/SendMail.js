import axios from 'axios';

export const SendMail = async (mail) => {
    return axios.post(`http://localhost:4000/sendMail/sendMail`,mail);
}