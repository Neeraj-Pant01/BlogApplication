const router = require("express").Router();
const userModel = require("../models/User.js");
const postModel = require("../models/posts.js");
const bcrypt = require("bcrypt");

//update a user
router.put("/:id",async (req,res)=>{
    if(req.body.userID === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password , salt);
        }
        try{
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id,
                {
                    $set : req.body
                },{
                    new : true
                })
                res.status(200).json(updatedUser)
        }catch(err){
            res.status(400).json(err)
        }
    }else{
        res.status(400).json("you can update only your account")
    }
})

//delete a user
router.delete('/:id',async(req,res)=>{
    if(req.body.userID === req.params.id){
        try{
            const user = await userModel.findById(req.params.id)
            try{
                await userModel.findByIdAndDelete(req.params.id)
                await postModel.deleteMany({username : user.username})
                res.status(200).json("user has been deleted")
            }catch(err){
                res.status(400).json(err)
            }
        }catch(err){
            res.status(400).json(err)
        }
    }else{
        res.status(400).json("you can delete only your account")
    }
})

//get a user
router.get('/:id',async(req,res)=>{
    try{
        const user = await userModel.findById(req.params.id);
        const {password, ...others} = user._doc
        res.status(200).json(others)
    }catch(err){
        res.status(400).json(err)
    }
})


module.exports = router