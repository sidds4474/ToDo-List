//localhost controller

const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json('Wrong Path !!!!! Just add /task in the URL..............Open http://localhost:8001/task on Browser');
});
module.exports = router;