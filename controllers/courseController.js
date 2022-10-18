const Course = require("../models/Course");
const Category = require("../models/Category");
//Course Create
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(400).json({
      status: "Request failed",
      error,
    });
  }
};

//get
exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort('-createdAt');
    const categories = await Category.find();

    res.status(200).render("courses", {
      courses,
      categories,
      page_name: "courses",
    });
    // .json({status: 'Success',courses,});
  } catch (error) {
    res.status(400).json({
      status: "Request failed",
      error,
    });
  }
};

//get just one of them
exports.getCourse = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }

    const categories = await Category.find();
    const course = await Course.findOne({ slug: req.params.slug });
    res.status(200).render("course", {
      course,
      categories,
      page_name: "courses",
    });
    // .json({status: 'Success',courses,});
  } catch (error) {
    res.status(400).json({
      status: "Request failed",
      error,
    });
  }
};
