const Users = require("../models/Users")
const mongoose = require("mongoose");

const SearchUsers= async (req, res)=>{
    let user=req.body;
    let firstName=user.firstName||"";
    let lastName=user.lastName||"";
    let phoneNamber=user.phoneNamber||"";
    let email=user.email||"";
    let adress=user.adress||"";

    try{
        let users=await Users.find({"firstName":new RegExp(firstName, 'i'),"lastName":new RegExp(lastName, 'i')
        ,"phoneNamber":new RegExp(phoneNamber, 'i'),"email":new RegExp(email, 'i'),"adress":new RegExp(adress, 'i')});
        return res.send(users);    
    }
    catch(err){
       console.log(err);
       return res.status(400).send(err.message)
    }
}
module.exports = {
    SearchUsers
}