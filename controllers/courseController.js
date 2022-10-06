const Course = require("../models/Course");

//Course Create
exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);

  try {
    res.status(201).json({
      status: 'Success',
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Request failed',
      error,
    });
  }
};
