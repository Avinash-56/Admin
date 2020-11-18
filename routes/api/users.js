const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("server Error");
  }
});

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
     


      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      if(email !== 'test1@gmail.com'){
        return res.status(400).json({msg: "Cannot login without admin credentials"})
      }
      

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("JWTSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);



router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password should be more than 6 characters').isLength({min:6})
], async (req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }


    const {name, email, password} = req.body
    
    try {
        
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({errors: [{msg: "User already exists"}]})
        }


        user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()
        
        const payload = {
            user:{
                id: user.id
            }
        }

        jwt.sign(payload, config.get('JWTSecret'),{
            expiresIn:360000
        }, (err,token)=>{
            if(err) throw err
            res.json({token})
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

router.get('/', auth,  async (req,res)=>{
  try {
      
      const user =  await (await User.find())
  
      res.json(user)
  
  } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
  }
  })

  router.delete('/:id', auth,  async (req,res)=>{

    try {
      if(req.params.id == req.user.id){
        return res.status(401).json({msg:"Cannot delete admin account"})
      }
        await User.findOneAndRemove({_id: req.params.id})
        res.json("User Deleted Succesfully ")
    
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
    })


// Update functionality not added due to less time. Apologies.   



module.exports = router;
