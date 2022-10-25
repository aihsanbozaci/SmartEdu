const Category = require("../models/Category");

//Category Create
exports.createCategory = async (req, res) => {

  try {
  const category = await Category.create(req.body);
    res.status(201).redirect('/users/dashboard')
  } catch (error) {
    res.status(400).json({
      status: 'Request failed',
      error,
    });
  }
};
//delete category
exports.deleteCategory = async (req, res) => {
  try {    

    await Category.findByIdAndRemove(req.params.id)

    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};