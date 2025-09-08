const express=require('express');
const userRouter=express.Router();
const path=require('path');
const rootDir=require('../utils/pathUtils');

userRouter.get('/',(req,res)=>{
    res.sendFile(path.join(rootDir,'views','index.html'))
});

module.exports=userRouter;