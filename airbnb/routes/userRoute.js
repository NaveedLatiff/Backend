const express=require('express');
const userRouter=express.Router();
const path=require('path');
const rootDir=require('../utils/pathUtils');
const data = require('../utils/dataStore');

userRouter.get('/',(req,res)=>{
 res.render('index',{data,title:"Home"});
});

module.exports=userRouter;