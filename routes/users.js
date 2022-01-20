var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create new user

router.post('/signup', async(req, res)=>{
  const user = req.body;

  const takenUsername = await User.findOne({username: user.username})
  const takenEmail = await User.findOne({email: user.email})

  if (takenUsername){
    res.json({message: "Username is already taken."})
  }
  else if (takenEmail){
    res.json({message: "Email is already taken."})
  }
  else {
    user.password = await bcrypt.hash(req.body.password, 10)

    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password
    })

    dbUser.save()
    res.json({message: "Account created!"})
  }
})

// Login

router.post('/login', (req,res)=> {
  
  const userLoggingIn = req.body;

  User.findOne({username: userLoggingIn.username})
  .then(dbUser=> {
    if (!dbUser) {
      return res.json({message: "Invalid username or password."})
    }

    bcrypt.compare(userLoggingIn.password, dbUser.password)
    .then(isCorrect => {
      if (isCorrect) {
        const payload = {
          id: dbUser._id,
          username: dbUser.username,
        }
        
        jwt.sign(
          payload,
          process.env.SECRET,
          {expiresIn: 86400},
          (err, token) => {
            if (err) {
              return res.json({message: err})
            }
            return res.json({
              message: "Success!",
              token: token
            })
          }
        )
      }
      else {
        return res.json({
          message: "Invalid username or password."
        })
      }
    })
  })
})


module.exports = router;
