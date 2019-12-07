const express=require('express');
const User=require('../model/database');
const Image=require('../model/database2');
const router=express.Router();

router.get('/',(req,res,next)=>{
	res.render('index');
});
router.get('/signup',(req,res,next)=>{
	res.render('signup');
});
router.post('/signup',async(req,res,next)=>{
	const user = new User(req.body);
	await user.save();
	console.log(user);
	res.redirect('/profile');
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
