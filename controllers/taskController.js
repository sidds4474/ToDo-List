const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Task = mongoose.model('Task');

// add or edit page is rendered here 

router.get('/', (req, res) => {
    // res.json('hey sid');
    res.render("task/addOrEdit", {
        viewTitle: "Create a To Do"
    });
});

// post request data for updation or insertion

router.post('/', (req, res) => {
    //console.log(req.body);
    if (req.body._id == '')
        insertTask(req, res);
    else
        updateRecord(req, res);
});

// insert ToDo method

function insertTask(req, res) {

    var task = new Task();
    task.taskName = req.body.taskName;
    task.taskDescription = req.body.taskDescription;
    task.taskCategory = req.body.taskCategory;
    task.dueDate = req.body.dueDate;
    task.save((err, doc) => {
        if (!err)
            res.redirect('task/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("task/addOrEdit", {
                    viewTitle: "Add a Task",
                    task: req.body
                });
            } else
                console.log('Error during task insertion : ' + err);
        }
    });
}

//ToDo Update method 

function updateRecord(req, res) {
    Task.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('task/list'); } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("task/addOrEdit", {
                    viewTitle: 'Update task',
                    task: req.body
                });
            } else
                console.log('Error during task update : ' + err);
        }
    });
}

// ToDo list page is rendered here

router.get('/list', (req, res) => {
    //res.json('hey sid');
    Task.find((err, docs) => {
        if (!err) {
            res.render("task/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving tasks :' + err);
        }
    });
});


//Form validation is done here

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'taskName':
                body['taskNameError'] = err.errors[field].message;
                break;
            case 'taskDescription':
                body['taskDescriptionError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}


//Updating a Todo using object id

router.get('/:id', (req, res) => {
    Task.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("task/addOrEdit", {
                viewTitle: "Update a Task",
                task: doc
            });
        }
    });
});

//Deleting a Todo using object id

router.get('/delete/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/task/list');
        } else { console.log('Error in task deletion :' + err); }
    });
});

module.exports = router;