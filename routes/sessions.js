var express = require('express');
const User = require('../models/user');
var router = express.Router();

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
