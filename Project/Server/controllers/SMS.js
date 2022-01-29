
const client = require('twilio')("ACbdeb35eba0c0c9c720aa73e0d5ab3d8c", "1edfb08326193a70164947b8b6e0a1dd");


const sendSMS = async (req, res) => {
    client.messages
        .create({
            body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
            from: '+9720533193202',
            to: req.body.to
        })
        .then(message => {
            console.log(message.sid)
        }).catch((error) => {
            console.log(error);

        });
}


module.exports = { sendSMS }

