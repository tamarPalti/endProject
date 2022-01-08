const fw = require('fs');

const createFile = async (req, res) => {

    let user = req.body;
    try {
        let file = "C:/Users/user1/Contacts";
        let content = "BEGIN:VCARD\r\n" + "VERSION:3.0\r\n" + "N:" + user.firstName + ";" + user.lastName + "\r\n" + "FN:" + user.firstName + " " + user.lastName + "\r\n"
            + "ORG:" + "" + "\r\n" + "TITLE:" + "" + "\r\n" + "TEL;TYPE=WORK,VOICE:" + user.phoneNamber[0] + "\r\n"
            + "TEL;TYPE=HOME,VOICE:" + user.phoneNamber[0] + "\r\n" + "ADR;TYPE=WORK:;;" +  "" + "\r\n" +"ADR;HOME:;;"+user.adress+ "\r\n"+
            "EMAIL;TYPE=PREF,INTERNET:" + user.email + "\r\n" + "END:VCARD\r\n";

        fw.writeFile(file + `/${user.firstName}_${user.phoneNamber[0]}.vcf`, content, (err, fd) => {
         
                console.log(err);

        });

        return res.send(user);
    }

    catch (error) {
        console.log("error with create vcf file " + error);
        return res.status(400).send(error.message)

    }
}

module.exports = { createFile };
