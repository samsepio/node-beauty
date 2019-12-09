const express=require('express');
const os=require('os');
const path=require('path');
const morgan=require('morgan');
const mongoose=require('mongoose');
const engine=require('ejs');
const multer=require('multer');
const uuid=require('uuid/v4');
const passport=require('passport');
const session=require('express-session');
const flash=require('connect-flash');
const {format} = require('timeago.js');
const app=express();

mongoose.connect('mongodb+srv://walter:3219329910@database1-wegwd.mongodb.net/test?retryWrites=true&w=majority')
	.then(db => console.log('conectado a la base de datos'))
	.catch(err => console.log(err));

require('./passport/local-auth');

app.set('puerto',process.env.PORT || 8000);
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
	secret: 'mys&/()/()&)as(=)',
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//creamaos una variable accesible desde cualquier parte de la aplicacion y le pedimos el valor del mensaje de error
app.use((req,res,next)=>{
	app.locals.signupMessage = req.flash('signupMessage');
	app.locals.signinMessage = req.flash('signinMessage');
	next();
});
//cuando suba una imagen le ponemos un nombre aleatorio con su extension
const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public/img/uploads'),
	filename: (req,file,cb,filename) => {
		cb(null,uuid()+path.extname(file.originalname));
	}
});
app.use(multer({
	storage: storage
}).single('image'));
//creamo una variable local que se pueda acceder desde cualquier lugar desde nuestra aplicacion y la usaremos en  nuestras vistas 
app.use((req,res,next)=>{
	app.locals.format = format;
	next();
});
app.use(require('./routes'));

app.use(express.static(path.join(__dirname,'./public')));

app.listen(app.get('puerto'),()=>{
	console.log(`servidor ejecutandose en el puerto ${app.get('puerto')}`);
});
