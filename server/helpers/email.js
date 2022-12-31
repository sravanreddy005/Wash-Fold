const nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
const fromMail = 'info@washandfold.com';
const axios = require("axios").default;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'emailsending.smtp@gmail.com',
        pass: 'emailsending_123'
    }
});

module.exports.sendMail = (toMail, replaceData, type, emailProvider = 'nodemailer') => {    
    return new Promise((resolve, reject) => {
        switch(type){
            case 'sendUserNamePassword':
                var templateFile = 'send-username-password.html';
                var subject = 'Authentication Details';
                break;
            case 'sendResetPassword':
                var templateFile = 'reset-password.html';
                var subject = 'Reset your password';
                break;
            default:
                subject = '';
                break;
        }

        fs.readFile(`./server/emails/${templateFile}`, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                console.log(err);
                reject(err)
              } else {
                const template = handlebars.compile(html);
                const htmlToSend = template(replaceData);
                if(emailProvider === 'pepiPost'){
                  let bodyData = {
                    from: {email: fromMail, name: 'Wash&Fold'},
                    subject: subject,
                    content: [
                      {
                        type: 'html',
                        value: htmlToSend
                      }
                    ],
                    personalizations: [
                      {
                        to: [{email: toMail, name: 'Wash&Fold'}]
                      }
                    ]
                  }

                  var options = {
                    method: 'POST',
                    url: 'https://api.pepipost.com/v5/mail/send',
                    headers: {'Content-Type': 'application/json', api_key: 'f62d9474506e5008954e080765c9b29d'},
                    data: bodyData
                  };

                  axios.request(options).then(function (response) {
                    console.log('email pepipost response', response.data);
                    resolve(response.data);
                  }).catch(function (error) {
                    console.error('email pepipost error', error);
                    reject(error);
                  });
                }else {
                  const mailOptions = {
                      from: 'Wash&Fold ' + fromMail,
                      to: toMail,
                      subject: subject,
                      html: htmlToSend
                  };
                  transporter.sendMail(mailOptions, function(error, responseStatus) {
                    if (error) {
                      console.log(error);
                      reject(error);
                    } else {
                      resolve(responseStatus)
                    }
                  });
                }                
              }
        });
    });
}