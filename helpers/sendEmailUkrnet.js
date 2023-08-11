const nodemailer = require('nodemailer');
require('dotenv').config();

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass:UKR_NET_PASSWORD
    }
};
// DATA EXAMPLE:
// const data = {
//     to: 'example@mail.com',
//     subject: 'Verify email',
//     html: '<p>Verify email</p>',
// }

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmailUkrnet = async (data) => {
    const email = { ...data, from: UKR_NET_EMAIL }
    await transport.sendMail(email);
    return true;
}

module.exports = sendEmailUkrnet;
