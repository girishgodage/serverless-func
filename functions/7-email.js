require("dotenv").config();
const nodemailer = require("nodemailer");

const { EMAIL_SERVICE, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;
const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  port: EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER, // generated ethereal user
    pass: EMAIL_PASSWORD, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.handler = async (event, context, cb) => {
  const method = event.httpMethod;
  if (method !== "POST") {
    return {
      statusCode: 405,
      body: "Only POST Requests Allowed",
    };
  }
  console.log(event.body);
  const { name, email, subject, message } = JSON.parse(event.body);
  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: "Please Provide All Values",
    };
  }
  const data = {
    from: "Girish Godage <learncodegirish@gmail.com>",
    to: `${name} <${email}>`,
    subject: subject,
    html: `<p>${message}</p>`,
  };
  try {
    await transporter.sendMail({ ...data });
    return {
      statusCode: 200,
      body: "Success",
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.message),
    };
  }
};
