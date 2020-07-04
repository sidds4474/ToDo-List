//mongo databse setup here

//database name is TaskDB1

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TaskDB1', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') } else { console.log('Error in DB connection : ' + err) }
});

require('./task.model');