const express = require("express");
const pageRoute = require("./routes/pageRoute");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');
const app = express();

//Connect DB

mongoose.connect("mongodb://localhost/smartedu-db").then(() => {
  console.log("smartEdu DB Connected!");
});

//Template Engine
app.set("view engine", "ejs");

//Global Variable

global.userIN = null;

//Middlewares

app.use(express.static("public"));
/*for postman*/
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/smartedu-db" }),
  })
);
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use(flash());
app.use((req,res,next)=>{
  res.locals.flashMessages = req.flash(); //local variable for flash messages
  next();
})
//ROUTE
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
