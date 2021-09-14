//Creating routes for user

var express = require("express");
const User = require("../models/User");
//using express validator for basic validation
const { body, validationResult } = require("express-validator");
const bcrypt=require('bcryptjs')

var router = express.Router();

//creating a new user,post request (/api/auth),does not need authentication

router.post(
  "/createuser",
  [
    //putting all the value that need to varify in an array.use boiler plate code of express-validator home page for this
    body("email", "Enter a valid email").isEmail(),
    body("name", "name must has atleast 2 charecter").isLength({ min: 2 }),
    body("password", "password must has atleast 5 charecters").isLength({
      min: 5,
    }),
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });//searching user with same email

      if (user) {
        return res
          .status(400)
          .json({ msg: "User already exists with same email" });
      }

      const salt=await bcrypt.genSaltSync(10);//generating salt
      const hash =await bcrypt.hashSync(req.body.password, salt);//hashing the password
      user = await User.create({
        //boiler plate code from express-validator website
        name: req.body.name,
        email: req.body.email,
        password: hash,//storing the hashed password
      })
      
      res.json({ msg: "User created" });
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = router;
