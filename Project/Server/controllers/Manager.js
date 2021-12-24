const Users = require("../models/Users");
const Business = require("../models/Business");

const getCountUsers = async (req, res) => {
    try {
        let users = await Users.find();
        return res.send(users.length);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const getCountBuisness = async (req, res) => {
    try {
        let business = await Business.find();
        return res.send(business.length);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const getCountAllUserByMonth = async (req, res) => {
    try {
        Users.aggregate(
            [

                {
                    "$group": {
                        "_id": { "month": { "$month": "$dateLogin" } },
                        "count": { "$sum": 1 }
                    }
                }
            ],
            function (err, result) {
                return res.send(result);
            }
        );
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

const getCountAllBusinessByMonth = async (req, res) => {
    try {
        Business.aggregate(
            [

                {
                    "$group": {
                        "_id": { "month": { "$month": "$dateLogin" } },
                        "count": { "$sum": 1 }
                    }
                }
            ],
            function (err, result) {
                return res.send(result);
            }
        );
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

const getCountSearchBusinessByMonth = async (req, res) => {
    try {
        Users.aggregate(
            [
                {$unwind: '$lastSearchBusiness'},
                { "$group": { "_id": { "month": { "$month": '$lastSearchBusiness.date' } }, count: { $sum: 1 } } },
            ],
            function (err, result) {
                return res.send(result);
            }
        );
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const getCountSearchUsersByMonth = async (req, res) => {
    try {
        Users.aggregate(
            [
                {$unwind: '$lastSearchUsers'},
                { "$group": { "_id": { "month": { "$month": '$lastSearchUsers.date' } }, count: { $sum: 1 } } },
            ],
            function (err, result) {
                return res.send(result);
            }
        );
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

module.exports = {
    getCountUsers, getCountBuisness, getCountAllUserByMonth, getCountAllBusinessByMonth, getCountSearchBusinessByMonth,getCountSearchUsersByMonth
}