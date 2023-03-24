const router = require("express").Router();
const userModel = require("../models/User.js");
const postModel = require("../models/posts.js");

//create a post
router.post('/',async (req, res)=>{
    try{
        const newPosts = new postModel(req.body);
        await newPosts.save();
        res.status(200).json(newPosts)
    } catch(error){
        console.log(400).json(error)
    }
})


//update a post
router.put('/:id',async (req,res)=>{
    try{
        const post = await postModel.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const updatedpost = await postModel.findByIdAndUpdate(req.params.id,{
                    $set : req.body,
                },{
                    new : true
                })
                res.status(200).json({message :"updated successfully"})
            }catch(err){
                res.status(400).json(err)
            }
        }else{
            res.status(400).json({message :"you can update only your post"})
        }
    }catch(err){
        res.status(400).json(err)
    }
})


//Get a post
router.get('/:id',async (req,res)=>{
    try{
        const post = await postModel.findById(req.params.id);
        res.status(200).json(post)
    }catch(err){
        res.status(400).json(err)
    }
})


//Get all Posts
router.get('/',async(req,res)=>{
    try{
        const username = req.query.user;
        const catname = req.query.cat;

        try{
            let posts;
            if(username){
                posts = await postModel.find({username : username})
                res.status(200).json(posts)
            }
            else if(catname){
                posts = await postModel.find({categories : {
                    $in:[catname]
                },})
                res.status(200).json(posts)
            }
            else{
                posts = await postModel.find()
                res.status(200).json(posts)
            }
        }catch(err){
            res.status(400).json(err)
        }
    }catch(err){
        res.status(500).json(err)
    }
})


//Delete a post
router.delete('/:id',async(req,res)=>{
    try{
        const post = await postModel.findById(req.params.id)

        if(post.username === req.body.username){
            try{
                await post.delete();
                res.status(200).json({message:"successfully deleted"})
            }catch(err){
                res.status(400).json(err)
            }
        }else{
            res.status(500).json({message:"ypu can delete only your post"})
        }
    }catch(err){
        res.status(400).json(err)
    }
})


module.exports = router;