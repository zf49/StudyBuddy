import * as nodemailer from "nodemailer";
import { getUserName, getUserProfile } from "../dao/user-dao";

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
}




export const emailSend = async (authID:string,friendID:string): Promise<boolean> => {

    console.log(authID)
    const userName = await getUserName(authID)
   
    
    console.log(userName[0].name)


    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'wangzhifang97@live.com',
            pass: 'wzf!@#000'
        },
        host: "smtp.live.com",
        port: 587,
        secureConnection: false,
        tls: {
            ciphers:'SSLv3'
        }
    });
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'wangzhifang000@gmail.com',
    //         pass: 'wzf!@#00'
    //     },
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true
    // })
    // TODO : get real address
    const mailOptions: MailOptions = {
        from: 'wangzhifang97@live.com',
        to: 'wangzhifang97@live.com',
        subject: userName[0].name + ' has followed you!',
        text: userName[0].name+' has already followed you! If you want to check the info of this user, please access Study Buddy!'
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
