const express=require('express');
const userRouter=express.Router();
// const path=require('path');
// const rootDir=require('../utils/pathUtils');
const {showData}=require('../controllers/rentHouse');


userRouter.get('/',showData);

module.exports=userRouter;