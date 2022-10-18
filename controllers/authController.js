const User = require("../models/User");
const bcrypt = require("bcrypt");
const Category = require('../models/Category');

//User Create
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      status: "Request failed",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    await User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, login) => {
          if (login) {
            //User Session
            req.session.userID = user.email;
            res.status(200).redirect("/users/dashboard");
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "Request failed",
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

//Dashboard
exports.getDashboardPage =  async (req, res) => {
  const user = await User.findOne({email:req.session.userID})
  const categories = await Category.find();
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories
  });
}; 