
//index
exports.getIndexPage = (req, res) => {
  res.status(200).render('index', { page_name: 'index' });
};
//about
exports.getAboutPage = (req, res) => {
  res.status(200).render('about', { page_name: 'about' });
};
//registerPage
exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', { page_name: 'register' });
};
//loginPage
exports.getLoginPage = (req, res) => {
  res.status(200).render('login', { page_name: 'login' });
};