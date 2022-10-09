const express = require ('express');
const pageRoute = require('./routes/pageRoute');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const app = express();

//Connect DB 

mongoose.connect('mongodb://localhost/smartedu-db',).then(()=>{
    console.log('smartEdu DB Connected!');
}); 


//Template Engine
app.set("view engine","ejs");

//Middlewares
app.use(express.static("public"));
    /*for postman*/
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    
//ROUTE
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);










const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});