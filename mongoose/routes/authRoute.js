const express=require('express');
const authRouter=express.Router();
const {getLogin}=require('../controllers/authController');
const {postLogin}=require('../controllers/authController');
const {getLogout}=require('../controllers/authController');
const {getSignup}=require('../controllers/authController');
const {postSignup}=require('../controllers/authController');

authRouter.get('/signup',getSignup);
authRouter.post('/signup',postSignup);
authRouter.get('/login',getLogin);
authRouter.post('/login',postLogin);
authRouter.post('/logout',getLogout);
module.exports=authRouter;