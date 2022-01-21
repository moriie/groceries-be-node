const User = require('../models/user');
const bcrypt = require('bcrypt')
const express = require('express')

const router = express.Router();

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


module.exports = router;
