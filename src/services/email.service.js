const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const config = require('../config/config');
const logger = require('../config/logger');
const handelbars=require('handlebars')

// Initialize email provider transport instance based on email provider
const transport = (function () {
  switch (config.email.provider) {
    case "sendgrid":
      logger.info("Setting SendGrid API key...");
      sgMail.setApiKey(config.email.key);
      return sgMail;

    case "aws":
      // To be implemented later. Use smtp for development
      throw new Error("AWS Mailer not supported");

    case "smtp":
    default:
      const tp = nodemailer.createTransport(config.email.smtp);
      if (config.env !== 'test') {
        tp
          .verify()
          .then(() => logger.info(`Connected to email server => ${config.email.smtp.host}`))
          .catch(() => logger.warn('Unable to connect to email server. Make sure you have correctly configured the SMTP options in .env'));
      }
      return tp;
  }
})();

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, html) => {
  
  const msg = {
    from: config.email.from,
    to,
    subject,
    html
  };

  switch(config.email.provider) {
    case "sendgrid":
      await transport.send(msg);
      break;

    case "aws":
      // To be implemented. Use smtp for development.
      break;

    case "smtp":
    default:
      await transport.sendMail(msg);
      break;
  }
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const Url = `${config.siteUrl}/reset-password?token=${token}`;
  const text = `<h1>Dear user,</h1>
  <p>To reset your password, click on this Button: <a href={{url}}><button>Click me</button></a></p>
  <p>If you did not request any password resets, then ignore this email.</p>`;
const html=handelbars.compile(text)({url:Url});
  await sendEmail(to, subject, html);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app


  

  const Url = `${config.siteUrl}/verify-email?token=${token}`;
  const text = `<h1>Dear user,</h1>
  <p>To verify your email, click on this Button: <a href={{url}}><button>Click me</button></a></p>
  <p>If you did not request any password resets, then ignore this email.</p>`;
const html=handelbars.compile(text)({url:Url});
  await sendEmail(to, subject, html);

};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};