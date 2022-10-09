const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

router.route('/').post(categoryController.createCategory); //localhost:3000/categories will work with it


module.exports = router;