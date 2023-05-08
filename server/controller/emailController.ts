import * as nodemailer from "nodemailer";

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
}

export const emailSend = async (): Promise<boolean> => {

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
    const mailOptions: MailOptions = {
        from: 'wangzhifang97@live.com',
        to: 'wangzhifang97@live.com',
        subject: 'Someone follow you!',
        text: '666666'
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
