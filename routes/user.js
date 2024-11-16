const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db");
const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config")
// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username=req.body.username
    const password=req.body.password
    const check= await User.find({username})
    if(check){
        res.status(400).json({message:"Username already exists"})
    }
    else{
        const user= await User.create({username,password})
        res.status(201).json({message:"User created successfully"})
    }

});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    
    const username=req.body.username
    const password=req.body.password
    const check= await User.find({username,password})
   if(check){
    const token= jwt.sign({username}, JWT_SECRET)
    res.json({token}) }
   else{
    res.status(400).json({message:"Invalid username or password"})
   }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courses=await User.find({})
    res.json({courses})
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const username=req.username
    console.log(username)
    const courseId=req.params.courseId
const availibility=await User.find({courseId})
if(availibility){
    User.updateOne({username},{
        purchasedCourses:
        {
            "$push":{purchasedCourse:courseId}
        }
    })
    res.json({
        message:"Course purchased successfully"
    })
        

} });

router.get('/purchasedCourses', userMiddleware, async(req, res) => {

    // Implement fetching purchased courses logic
    const username=req.username
    console.log(username)
    const courseId=req.params.courseId
    const user= await User.findOne({
        username: req.headers.username
    
     }) 
     console.log(user.purchasedCourses)
    const courses = await Course.find({
        _id:{
            "$in": user.purchasedCourses
    
        }})
        res.json({
            courses: courses
        })
    
    })


module.exports = router