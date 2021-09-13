//Creating routes for log in 

var express = require('express');
const User=require('../models/User')
//using express validator for basic validation
const { body, validationResult } = require('express-validator');

var router = express.Router();


//creating a new user,post request (/api/auth),does not need authentication



router.post('/',[
  //putting all the value that need to varify in an array.use boiler plate code of express-validator home page for this
  body('email','Enter a valid email').isEmail(),
  body('name','name must has atleast 2 charecter').isLength({ min: 2 }),
  body('password','password must has atleast 5 charecters').isLength({ min: 5 })
], function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      User.create({//boiler plate code from express-validator website
        name: req.body.name,
        email:req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=>{
        console.log(err)
        res.json({error:"please enter an unique value"})
      
      });
    }
      
  )


module.exports = router;
