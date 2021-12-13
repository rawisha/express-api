const sgMail = require("@sendgrid/mail");
require("dotenv").config()
const API_KEY = process.env.API_KEY;
sgMail.setApiKey(API_KEY);

const sendMail = (body) => {
    const message = {
        to: body.email,
        from: "rawvsmaw22@gmail.com",
        subject: "Thank you for Registering with us",
        text: "You have Successfully created an account with us",
        html: "<h2>You have Successfully created an account with us</h2>",
      }
      sgMail
        .send(message)
        .then(res => console.log("Email sent"))
        .catch(error => console.log(error));
    };

module.exports = sendMail