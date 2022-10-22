const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Category = require("../models/Category");
const Courses = require("../models/Course");
const Course = require("../models/Course");

//User Create
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.flash(
      "success",
      "You have successfully registered! You can login now!"
    );
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }
    res.status(406).redirect("/register");
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
            req.session.userID = user._id;
            res.status(200).redirect("/users/dashboard");
          } else {
            req.flash("error", `Your password is not correct!`);
            res.status(401).redirect('/login');
          }
        });
      } else{
        req.flash("error", `User is not exist!`);
        res.status(401).redirect('/login');
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
exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "courses"
  );
  const categories = await Category.find();
  const courses = await Courses.find({ user: req.session.userID });
  const users = await User.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
    users
  });
};
//delete users
exports.deleteUser = async (req, res) => {
  try {    

    await User.findByIdAndRemove(req.params.id)
    await Course.deleteMany({user:req.params.id})

    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};