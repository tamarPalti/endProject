export const CheckManager = (email, password) => {

   (localStorage.getItem("managerMail")) 
        let mailManager = localStorage.getItem("managerMail").split("@");
        let mailArr = mailManager[0].split("");
        let mail = mailArr.filter((elem, index) => index % 2 == 0).join("");
        let newMail = mail + "@" + mailManager[1];

        let idManager = localStorage.getItem("managerId").split("").filter((elem, index) => index % 2 == 0).join("");
        return email === newMail && password === idManager;

}