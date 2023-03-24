const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connection = require("./connection/connection.js")
const userRoute = require("./routes/auth.js")
const postRoute = require("./routes/post.js")
const categRoute = require("./routes/categories.js")
const usersRoute = require("./routes/user.js")
const cors = require("cors");
const multer = require("multer");
const path = require("path")

const app = express();
connection()
app.use(express.json());
app.use(cors())
app.use('/images',express.static(path.join(__dirname,"/images")))

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, "images");
    },
    filename: (req, file, cb)=>{
        cb(null, req.body.name)
    }
});

const upload = multer({storage: storage})

app.post('/api/uploads',upload.single('file'), (req,res)=>{
    res.status(200).json("file has been uploaded")
})
  

app.use('/api/user',userRoute)
app.use('/api/posts', postRoute)
app.use('/api/categories', categRoute)
app.use('/api/users', usersRoute)


app.listen(process.env.PORT,()=>{
    console.log(`listening at the ${process.env.PORT}`)
})


//solve the multiple import problem in express




