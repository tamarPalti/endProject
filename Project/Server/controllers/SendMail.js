

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail.com',
    secure: false,
    auth: {
        user: 'memailproject@gmail.com',
        pass: 'MeMail212535033'
    },
    tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {
    from: 'memailproject@gmail.com',
    accessKeyId: 'AWSACCESSKEY',
    secretAccessKey: 'AWS/Secret/key',
    attachments: [{
        filename: 'logo.png',
        path: __dirname + '/images/logo.png',
        cid: 'unique@kreata.ee'
    }
    ]
}

var sendMailFunc = function (toUser, subject, text, attachments) {
    mailOptions.to = toUser;
    mailOptions.subject = subject;
    mailOptions.html = text;
    mailOptions.attachments = attachments;
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('sent email!')
        }
    })
}

const sendMailcontroller = async (req, res) => {
    let { toUser, subject, text, attachments } = req.body;
    try {
        sendMailFunc(toUser, subject, text, attachments);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}
module.exports = { sendMailcontroller }