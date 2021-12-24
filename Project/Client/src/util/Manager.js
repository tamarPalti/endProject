import axios from 'axios';
export const CheckManager = (email, password) => {

        (localStorage.getItem("managerMail"))
        let mailManager = localStorage.getItem("managerMail").split("@");
        let mailArr = mailManager[0].split("");
        let mail = mailArr.filter((elem, index) => index % 2 == 0).join("");
        let newMail = mail + "@" + mailManager[1];

        let idManager = localStorage.getItem("managerId").split("").filter((elem, index) => index % 2 == 0).join("");
        return email === newMail && password === idManager;

}

export const CheckManagerFunc = () => {

        return CheckManager(localStorage.getItem("currentUserMail"), localStorage.getItem("currentUserPassword"))
}

export const GetCountAllUserByMonth = async () => {
        let arrByMonth = await axios.get(`http://localhost:4000/manager/getCountAllUserByMonth`);
        let arr=[12].fill(0);
        arrByMonth.data.forEach(element => {
                arr[element._id.month]=element.count;
        });
        return arr;
}
export const GetCountAllBusinessByMonth = async () => {
        let arrByMonth = await axios.get(`http://localhost:4000/manager/getCountAllBusinessByMonth`);
        let arr=[12].fill(0);
        arrByMonth.data.forEach(element => {
                arr[element._id.month]=element.count;
        });
        return arr;
}
export const GetCountSearchUsersByMonth = async () => {
        let arrByMonth = await axios.get(`http://localhost:4000/manager/getCountSearchUsersByMonth`);
        let arr=[12].fill(0);
        arrByMonth.data.forEach(element => {
                arr[element._id.month]=element.count;
        });
        return arr;
}
export const GetCountSearchBusinessByMonth = async () => {
        let arrByMonth = await axios.get(`http://localhost:4000/manager/getCountSearchBusinessByMonth`);
        let arr=[12].fill(0);
        arrByMonth.data.forEach(element => {
                arr[element._id.month]=element.count;
        });
        return arr;
}