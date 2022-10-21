const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { body } = require('express-validator');
const User = require("../models/User");

router.route('/signup').post(
[
    body('name').not().isEmpty().withMessage('Please your name! '),
    body('email').not().isEmpty().withMessage(' Please enter a valid email! ')
    .custom((userEmail)=>{
        return User.findOne({email: userEmail}).then(user=>{
            if(user){
                return Promise.reject('Email is already exists!')
            }
        })
    }),
    body('password').not().isEmpty().withMessage(' Please enter your password!')
],
)

router.route('/signup').post(authController.createUser); //localhost:3000/users/signup will work with it
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authController.getDashboardPage); http://localhost:3000/users/dashboard
module.exports = router;