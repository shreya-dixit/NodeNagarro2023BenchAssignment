    
require('./models/db');

const express = require('express');
const Handlebars = require('handlebars');
var app = express();
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});



const path = require('path');
const bodyparser = require('body-parser');

 const studentController = require('./controllers/studentController');


app.use(bodyparser.urlencoded({
    extended: true
 }));
app.use(bodyparser.json());
 app.set('views', path.join(__dirname, '/views/'));
 
 const exphbs = require('express-handlebars');
 app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout', handlebars: allowInsecurePrototypeAccess(Handlebars),layoutsDir: __dirname + '/views/layouts/' }));
  app.set('view engine', 'hbs');
  

 app.use('/', studentController);
 