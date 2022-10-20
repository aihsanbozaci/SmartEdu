
//index
exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render('index', { page_name: 'index' });
};
//about
exports.getAboutPage = (req, res) => {
  res.status(200).render('about', { page_name: 'about' });
};
//registerPage
exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', { page_name: 'register' });
};
//loginPage
exports.getLoginPage = (req, res) => {
  res.status(200).render('login', { page_name: 'login' });
};
//contact
exports.getContactPage = (req, res) => {
  res.status(200).render('contact', { page_name: 'contact' });
};
//sendEmail
const nodemailer = require("nodemailer");
exports.sendEmail = async (req, res) => {
  //console.log(req.body);
  const outputMessage = `
  <h1>Mail Details </h1>
  <ul> 
    <li>Name: ${req.body.name} </li>  
    <li>Email: ${req.body.email}</li>  
  </ul>
  <h1>Message<h1>
  <p> ${req.body.message} </p>  
  `
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "ahmetbozac@gmail.com", // gmail account
      pass: "cbrsrpttzqfqprws", // gmail password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"SmartEDU Contact Form 👻" <ahmetbozac@gmail.com>', // sender address
    to: "rohleder00@yandex.com", // list of receivers
    subject: "Message From SmartEDU✔", // Subject line
    //text: "Hello world?", // plain text body
    html: outputMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
 
res.status(200).redirect('/contact')
};