const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb+srv://shrey:dhonirainabazz@cluster0.0dbkboa.mongodb.net/");

// Define schemas
const AdminSchema = new mongoose.Schema(
    // Schema definition here
    'Admin',{
        username:String,
        password:String 
    }
);

const UserSchema = new mongoose.Schema(
    // Schema definition here
    'User',{
        username:String,
        password:String
    }
);

const CourseSchema = new mongoose.Schema(
    // Schema definition here
    'Course',{Authorization:String,
        title:String,
        price:Number,
        imageLink:String,
        
    }
);

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}