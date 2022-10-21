const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleMiddleware');


router.route('/').post(courseController.createCourse); //localhost:3000/courses will work with it
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router.route('/').post(roleMiddleware(["teacher","admin"]), courseController.createCourse); //admin and teachers can create courses
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);
router.route('/:slug').delete(courseController.deleteCourse);
module.exports = router;