import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      type: "OAuth2",
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_APP_PASS,
    },
  });

  transporter.set("oauth2_provision_cb", (user, renew, callback) => {
    let accessToken = userToken[user];
    if (!accessToken) {
      return callback(new Error("Unknown user"));
    } else {
      return callback(null, accessToken);
    }
  });


  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.to,
    subject: options.subject,
    html: options.message,
    text: "This is an automatique email!",
    auth: {
      user: "user@example.com",
    },
  };

  await transporter.sendMail(mailOptions);
};
