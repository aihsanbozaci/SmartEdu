const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();

router.route('/').post(courseController.createCourse); //localhost:3000/courses will work with it


module.exports = router;