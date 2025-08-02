// import nodeMailer from 'nodemailer'
// export const sendEmail=async(options)=>{
//     const transporter=nodeMailer.createTransport({
//         service:process.env.SMTP_SERVICE || 'gmail', // Default to Gmail if not specified
//         auth:{
//             user:process.env.SMTP_MAIL || "shivamji730@gmail.com" ,
//             pass:process.env.SMTP_PASSWORD || "btad lewm luqi yglw"
//         }
//     })
//     const mailOptions={
//         from:process.env.SMTP_MAIL || 'shivamji730@gmail.com'   ,
//         to:options.email,
//         subject:options.subject,
//         text:options.message
//     }
//     await transporter.sendMail(mailOptions);
// }



import nodeMailer from 'nodemailer';

export const sendEmail = async (options) => {

    console.log("nn",process.env.SMTP_PASSWORD, process.env.SMTP_MAIL,process.env.SMTP_PASSWORD);
    
    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
        // You can add html option here for better formatted emails
    };

    await transporter.sendMail(mailOptions);
};

// New function specifically for sending OTP emails with HTML formatting
export const sendOTPEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text:options.message,
        // html: `
        //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        //         <h2 style="color: #333;">Email Verification</h2>
        //         <p>Your OTP for email verification is:</p>
        //         <div style="background: #f4f4f4; padding: 10px; margin: 10px 0; font-size: 24px; letter-spacing: 2px; text-align: center;">
        //             <strong>${otp}</strong>
        //         </div>
        //         <p>This OTP will expire in 10 minutes.</p>
        //         <p>If you didn't request this, please ignore this email.</p>
        //     </div>
        // `
    };

    
    await transporter.sendMail(mailOptions);
};