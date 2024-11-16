const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,User}=require("../db")
const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config")
// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username=req.body.username
    const password=req.body.password
 await   Admin.create(username,password)
    res.json({msg: "admin created successfully"})
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username=req.body.username
    const password=req.body.password
    const admin=Admin.find({username,password})
    if(admin){ const token=jwt.sign({
        username},
        JWT_SECRET);
        res.json({
            token
        })

    }
    else{res.status(411).json({msg:"admin not found"})}
   

    })
;

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const Authorization=req.headers.Authorization
    const title=req.body.title
    const description=req.body.description 
    const price=req.body.price
    const imageLink=req.body.imageLink
    const check= await Admin.find({
        title,description,price,imageLink
    })
    if(check){
        res.json({msg:"Course Exists"})
    }
    else{
        const create= await Admin.create({
            title,description,price,imageLink
        })
        res.json({msg:"Course created successfully!"})
    }
    
});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    const find= await Course.find({})
    res.json({courses:find})
});

module.exports = router;