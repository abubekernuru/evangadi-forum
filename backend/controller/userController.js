const bcrypt = require('bcrypt')
const { StatusCodes } = require('http-status-codes')
const dbConnection = require('../config/db')
const jwt = require('jsonwebtoken')
require('dotenv').config();

async function register(req, res){

    const { username, first_name, last_name, email, password } = req.body;
    if(!email || !password || !first_name || !last_name || !username){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "All fields are required" });
    }
    if(password.length <= 8){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Password cannot be empty" });
    }
    try {
        // Check if user already exists
        const [user] = await dbConnection.query("SELECT username, id FROM users WHERE username = ? or email = ?", [username, email]);
        if(user.length > 0){
            return res.status(StatusCodes.CONFLICT).json({ msg: "User already exists" });
        }
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        await dbConnection.query(
            "INSERT INTO users (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
            [username, first_name, last_name, email, hashedPassword]
        );
        res.status(StatusCodes.CREATED).json({ msg: "User registered successfully" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later!", error});
    }
}

async function login(req, res){
    const { email, password } = req.body;
    if(!email || !password ){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please enter all required fields" });
    }
    
    try {
        const [user] = await dbConnection.query("SELECT username, id, password FROM users WHERE email = ?", [email]);
        if(user.length == 0){
            return res.status(StatusCodes.CONFLICT).json({ msg: "Invalid credential" });
        }
        // compare password
        const isMatch = await bcrypt.compare(password, user[0].password)
        if(!isMatch){
            return res.status(StatusCodes.CONFLICT).json({ msg: "Invalid credential" });
        }
        const username = user[0].username;
        const id = user[0].id;
        const token = jwt.sign({username, id}, process.env.JWT_SECRET, {expiresIn: "1d"});

        return res.status(StatusCodes.OK).json({msg: "user login successful", token})
    
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later!", error});
    }
}

async function checkUser(req, res){
    const username = req.user.username 
    const id = req.user.id 
    res.status(StatusCodes.OK).json({msg: "valid user", username, id})
    // res.send("check user")
}

module.exports = { register, login, checkUser };
