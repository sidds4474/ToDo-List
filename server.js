//main js file
require('./models/db');

//All requirements written here
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
// const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const taskController = require('./controllers/taskController');
const defaultpathController = require('./controllers/defaultpathController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
//body-parser
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

//app is hosted at 8001/task
app.listen(8001, () => {
    console.log('Express Server started at port : 8001........Open http://localhost:8001/task on Browser');
});

// Default controller is used if 8001 is accessed
app.use('/', defaultpathController);

// task controller is used if 8001/task is accessed
app.use('/task', taskController);