//database model is defined here

const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({

    taskName: {
        type: String,
        required: 'This field is required.'
    },
    taskDescription: {
        type: String,
        required: 'This field is required.'
    },
    taskCategory: {
        type: String
    },
    dueDate: {
        type: Date,
        default: Date.now()
    }
});

//schema name is taskSchema
mongoose.model('Task', taskSchema);