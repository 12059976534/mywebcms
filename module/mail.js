var nodemailer = require('nodemailer');

class Mail {

  auth(code, to, err, success) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mail.send.digit@gmail.com',
        pass: 'mail.digit123*'
      }
    });

    var mailOptions = {
      from: 'send.digit@gmail.com',
      to: to,
      subject: 'auth code',
      html: `<center><p>your verification code</p><h1>${code}</h1></center>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return transporter
  }
}

module.exports = { Mail }