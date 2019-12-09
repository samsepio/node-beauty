const express=require('express');
const User=require('../model/database');
const Image=require('../model/database2');
const {unlink}=require('fs-extra');
const passport=require('passport');
const path=require('path');
const router=express.Router();

router.get('/',(req,res,next)=>{
	res.render('index');
});
router.get('/signin',(req,res,next)=>{
	res.render('signin');
});
router.post('/signin',passport.authenticate('local-signin',{
	successRedirect: '/beauty',
	failureRedirect: '/signin',
	passReqToCallback: true
}));
router.get('/signup',(req,res,next)=>{
	res.render('signup');
});
router.post('/signup',passport.authenticate('local-signup',{
	successRedirect: '/profile',
	failureRedirect: '/signup',
	passReqToCallback: true
}));
router.get('/delete/:id',async(req,res,next)=>{
	const {id} = req.params;
	const image = await Image.findByIdAndDelete(id);
	await unlink(path.resolve('./src/public'+image.path));
	res.redirect('/beauty');
});
router.get('/image/:id',async(req,res,next)=>{
	const {id} = req.params;
	const image = await Image.findById(id);
	console.log(image);
	res.render('perfil',{
		image
	});
});
router.get('/profile',(req,res,next)=>{
	res.render('profile');
});
router.get('/beauty',async(req,res,next)=>{
	const images = await Image.find();
	res.render('beauty',{
		images
	});
});
router.post('/profile',async(req,res,next)=>{
	const image = new Image();
	image.title = req.body.title;
	image.description = req.body.description;
	image.filename = req.file.filename;
	image.path = '/img/uploads/'+req.file.filename;
	image.originalname = req.file.originalname;
	image.mimetype = req.file.mimetype;
	image.size=req.file.size;
	await image.save();
	console.log(image);
	res.redirect('/beauty');
});

module.exports=router;
