const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
    const token = req.headers["authorization"]
    
    if(!token) {
        res.status(400).json({ msg: "Token invalid#01" })
        return 
    }

    jwt.verify(token, "MyS&ecretKe!", (err, decoded) => {
        if(err) {
            console.log(err)
            res.status(400).json({ msg: "Token invalid#02" })
            return 
        }

        console.log('jwt',decoded)
        req.session = decoded
        next()
    })
}

module.exports = authMiddleware