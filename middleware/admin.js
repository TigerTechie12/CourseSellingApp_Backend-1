// Middleware for handling auth
const jwt=require('jsonwebtoken')
const {JWT_SECRET}= require("../config")
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
const token=req.headers.Authorization
const partoftokentogetverified=token.split(" ")
const word=partoftokentogetverified[1]

try{
    const decodedValue= jwt.verify(word,JWT_SECRET)
    if(decodedValue.username){
    next()
}
else{
    res.status(403).json({msg:"you are not authenticated"})
}}

catch(e){
    res.json({msg:"Incorrect Input"})
}






}

module.exports = adminMiddleware;