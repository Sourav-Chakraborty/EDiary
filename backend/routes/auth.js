//Creating routes for user

var express = require("express");
const User = require("../models/User");
//using express validator for basic validation
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var router = express.Router();

const JWTSecret = "$$You are not $welcome&&#";//our jwt signature(random string generated by us)

//creating a new user,post request (/api/auth/createuser),does not need authentication



router.post(
  "/createuser",
  [
    //putting all the value that need to varify in an array.use boiler plate code of express-validator home page for this
    body("email", "Enter a valid email").isEmail(),
    body("name", "name must has atleast 2 charecter").isLength({ min: 2 }),
    body("password", "password cannot be blank").isLength({
      min: 5,
    }),
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email }); //searching user with same email

      if (user) {
        return res
          .status(400)
          .json({ msg: "User already exists with same email" });
      }

      const salt = await bcrypt.genSaltSync(10); //generating salt
      const hash = await bcrypt.hashSync(req.body.password, salt); //hashing the password
      user = await User.create({
        //boiler plate code from express-validator website
        name: req.body.name,
        email: req.body.email,
        password: hash, //storing the hashed password
      });


      /* will use jwt web token to identify all authentic user ,for jwt we need id of the user & a seckret sign*/

      //user id ,we are using for jwt 
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWTSecret);//jwtSecret is our own signature,it will help us to identify user 

      res.json({ authToken });
    } catch (err) {
      console.error(err);
      res.status(500).send({msg:"some internal error occure"})
    }
  }
);



//authenticate a user,post request (/api/auth/login),does not need authentication



router.post(
  "/login",
  [
    //putting all the value that need to varify in an array.use boiler plate code of express-validator home page for this
    body("email", "Enter a valid email").isEmail(),
  
    body("password", "password cannot be blank").exists()
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email }); //searching user with same email

      if (user===undefined) {
        return res
          .status(500)
          .json({ msg: "please put valid credentials" });
      }

      const passwordCompare=await bcrypt.compare(req.body.password,user.password)//compair given password & stored password,argument order is important
      console.log(passwordCompare)

      if(passwordCompare===false){
        return res
          .status(500)
          .json({ msg: "please put valid credentials" });
      }
     
      /* will use jwt web token to identify all authentic user ,for jwt we need id of the user & a seckret sign*/

      //user id ,we are using for jwt 
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWTSecret);//jwtSecret is our own signature,it will help us to identify user 

      res.status(200).json({ authToken });
    } catch (err) {
      console.error(err);
      res.status(500).send({msg:"some internal error occure"})
    }
  }
);

module.exports = router;
