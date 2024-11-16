const jwt=require('jsonwebtoken')
const {JWT_SECRET}= require("../config")
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
const jwt=req.headers.Authorization
const jwttokenwithoutbearer=jwttoken.split(" ")
const jwttoken=jwttokenwithoutbearer[1]
const decode=jwt.verify(jwttoken,secret)

if(decode.username){
    req.username=decode.username
    next()
}
else{
    res.status(403).json({msg:"not authenticated"})
}
}

module.exports = userMiddleware;