const Course = require('../models/Course') 
const User = require('../models/User') 

//index
exports.getIndexPage = async (req, res) => {
  const courses = await Course.find().sort('-createdAt').limit(1);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.find().countDocuments({role:'Student'});
  const totalTeachers = await User.find().countDocuments({role:'Teacher'});
  res.status(200).render('index', {
     page_name: 'index',
     courses,
     totalCourses,
     totalTeachers,
     totalStudents
    });
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
  try{
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

    let sendResult = await transporter.sendMail({
      from: 'SmartEDU <message@smartedu.com>',
      to: 'ahmetbozac@gmail.com',
      subject:'Message From SmartEDU 📬',
      html: outputMessage
    })
    console.log(sendResult)
  
req.flash("success","We received your message successfully!");
res.status(200).redirect('/contact')
}
catch(err){
 // req.flash("error", `We did not receive your message! ||  ${err}`);
  req.flash("error", `We did not receive your message!`);
  res.status(200).redirect('/contact')
}
};