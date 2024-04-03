const nodemailer = require('nodemailer');
require('dotenv').config();
const mailSender = async(email , title , body) => {
    try{
        // Creating The Transporter For Sending The Mail
        let transporter = await nodemailer.createTransport({
            host:`${process.env.MAIL_HOST}`,
            port:587,
            secure:false,
            auth:{
                user:`${process.env.MAIL_USER}`,
                pass:`${process.env.MAIL_PASS}`,
            },
            tls:{rejectUnauthorized:false}
        })
        let info = await transporter.sendMail({
            from:`${process.env.MAIL_USER}`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        console.log("Mail User --> ",process.env.MAIL_USER)
        console.log(info)
        return info;
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;