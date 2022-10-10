const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/signup').post(authController.createUser); //localhost:3000/users/signup will work with it
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
module.exports = router;