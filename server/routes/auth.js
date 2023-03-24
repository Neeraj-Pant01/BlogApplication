const express = require("express");
const router = express.Router();
const userModel = require("../models/User.js")
const bcrypt = require("bcrypt");

//Register
router.post('/register', async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password : hashPass
        })
        await newUser.save();
        res.status(200).send({message:"registered sucessfully"})
    }catch(error){
        res.status(403).send({message:"something went wrong"})
    }
})

//Login
router.post('/login',async (req,res)=>{
    try{
        const user = await userModel.findOne({username : req.body.username});
        !user && res.status(400).json("wrong credentials")

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("wrong credentials")

        const {password, ...others} = user._doc;
        res.status(200).json(others)
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;