//Creating routes for log in 

var express = require('express');
const User=require('../models/User')
var router = express.Router();

//creating a new user,post request (/api/auth),does not need authentication

router.post('/', function (req, res) {
    console.log(req.body)
    const user=new User(req.body)
    user.save()
    res.send(req.body);
  })


module.exports = router;
