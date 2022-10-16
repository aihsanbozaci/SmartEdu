const express = require('express');
const pageController = require('../controllers/pageController');
const authController = require('../controllers/authController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/dashboard').get(authMiddleware,authController.getDashboardPage);
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);
module.exports = router;