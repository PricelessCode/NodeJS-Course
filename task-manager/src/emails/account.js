const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);



// sgMail.send({
//     to: 'poream3387@gmail.com',
//     from: 'poream3387@gmail.com',
//     subject: 'This is my first creattoin!',
//     text: 'I hope this gets to you'
// });

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'poream3387@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'poream3387@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}