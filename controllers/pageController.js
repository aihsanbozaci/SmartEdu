
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
  const outputMessage = `
  <h1>Mail Details </h1>
  <ul> 
    <li>Name: ${req.body.name} </li>  
    <li>Email: ${req.body.email}</li>  
  </ul>
  <h1>Message</h1>
  <p> ${req.body.message} </p>  
  `
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'louie.fisher42@ethereal.email',
        pass: 'aJbRMK4KVNa7vppQKr'
    }
});
  async function run(){
    let sendResult = await transporter.sendMail({
      from: 'SmartEDU <message@smartedu.com>',
      to: 'ahmetbozac@gmail.com',
      subject:'Message From SmartEDU 📬',
      html: outputMessage
    })
    console.log(sendResult)
  }
run().catch(err=> console.error(err))
res.status(200).redirect('/contact')
};