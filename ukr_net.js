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

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
    from: UKR_NET_EMAIL,
    to: 'gepewok455@tiuas.com',
    subject: 'Verify email',
    html: '<p>Verify email</p>',
};

transport.sendMail(email)
    .then(() => console.log('Email sent successfully'))
    .catch((error) => console.log(error.message));
