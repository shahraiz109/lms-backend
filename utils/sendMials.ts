require("dotenv").config();
import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

const sendMail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: parseInt(process.env.SMPT_PORT || "587"),
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;

  // get path to the email template file

  const templatePath = path.join(__dirname, "../mails", template);

  // render email template with ejs
  const html: string = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
