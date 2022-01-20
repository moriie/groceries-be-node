require("dotenv").config();

const isLoggedIn = (req, res, next) => {_
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.SECRET), (err, decoded) => {
            if (err) return res.json({
                isLoggedIn: false,
                messaged: "Failed to Authenticate"
            })
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username
            next()
        
        }
    }
    else {
        res.json({message: "Incorrect Token", isLoggedIn: false})
    }
}