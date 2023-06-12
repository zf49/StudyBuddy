import * as nodemailer from "nodemailer";
import { getUserName, getUserProfile } from "../dao/user-dao";

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
}




export const emailSend = async (authID: string, friendID: string): Promise<boolean> => {

    console.log(authID)
    const user = await getUserName(authID)


    console.log('emial',user)


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
            ciphers: 'SSLv3'
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
    const mailOptions: any = {
        from: 'wangzhifang97@live.com',
        to: 'chriswang49@outlook.com',
        subject: `${user[0].name} has followed you!`,
        html: 
        `<html>
            <body style="color: #333; font-family: Arial, sans-serif;">
                <h1 style="color: #4F8A10;">${user[0].name} has followed you!</h1>
                <p>${user[0].name} has already followed you! If you want to check the info of this user, please access <b>Study Buddy</b>!</p>
                <p style="text-align: center;">
                <a href="http://localhost:3000/login" style="background-color: #4F8A10; color: #fff; padding: 10px 20px; text-decoration: none;">Visit Study Buddy</a>
                </p>
                <img src="https://png.pngtree.com/thumb_back/fw800/background/20190220/ourmid/pngtree-green-wave-point-geometric-banner-image_7082.jpg" alt="Study Buddy Image" style="width: 100%;"/>
            </body>
        </html>`
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
