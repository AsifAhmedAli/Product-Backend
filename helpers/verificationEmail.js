const crypto = require('crypto');
const EmailUrl = require('../model/EmailUrl');
const nodemailer = require('nodemailer');

const sendVerificationEmail = async (person, callback) => {
    const user = person._doc;
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const customUrl = `${process.env.BASE_URL}${process.env.PORT}/verifyemail?email=${user.email}&id=${verificationToken}`;
    const mailOptions = {
        from: 'Mexil Software Solutions',
        to: 'awaisabbas47@gmail.com',
        subject: 'Verify your email',
        html: `<h1>Verify your email by clicking on this link: <br><br/> ${customUrl}</h1>`,
    }

    // let testAccount = await nodemailer.createTestAccount();

    let trans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    });

    trans.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


    // save url to database
    const emailUrl = new EmailUrl({
        url: customUrl
    }).save()

    if (!emailUrl) {
        return res.status(401).json({ error: 'Error saving url to database' });
    }

    return callback(null, mailOptions);
}

module.exports = sendVerificationEmail;