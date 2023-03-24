const router = require("express").Router();
const categoryModel = require("../models/Category.js");


router.post('/',async(req,res)=>{
    const newCateg = new categoryModel(req.body);
    try{
        await newCateg.save()
        res.status(200).json(newCateg)
    }catch(error){
        res.status(400).json(error)
    }
})

router.get('/',async (req,res)=>{
    try{
        const allCateg = await categoryModel.find();
        res.status(200).json(allCateg)
    }catch(err){
        res.status(400).json(err)
    }
})

module.exports = router