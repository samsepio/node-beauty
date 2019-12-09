const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../model/database');

//cuando viajemos a una nueva pagina la pagina nos manda el id y lo autenticamos 
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
	const user = await User.findById(id);
	done(null,user);
});

//una ves el usuario ya se aya logueado lo guardamos en n archivo para que las distintas paginas no pidan un logueo a cada rato
passport.use('local-signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},async(req,email,password,done) => {

	const user = User.findOne({email: email});
	if(user){
		return done(null,false,req.flash('signupMessage','el correo ya a sido tomado'));
	} else {
		  const newUser = new User();
        	  newUser.email = email;
        	//utilisamos el metodo encryptPassword definido en la base de datos el cual cifra la contraseña esto es para guardar la contraseña cifrada y no en texto plano
        	  newUser.password = newUser.encryptPassword(password);
        	  await newUser.save();
        	  done(null,newUser);
	}
}));
passport.use('local-signin',new LocalStrategy({
	usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
},async(req,email,password,done) => {
	const user = await User.findOne({email: email}) ;
	if(!user){
		return done(null,false,req.flash('signinMessage','el correo no esta registrado'));
	}
	if(!user.comparePassword(password)){
		return done(null,false,req.flash('signinMessage','contraseña incorrecta'));
	}
	done(null,user);
}));
