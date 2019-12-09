const mongoose=require('mongoose');
const bcrypt=require('bcrypt-nodejs');
const Schema=mongoose.Schema;

const userSchema = new Schema({
	email:{type: String},
	password:{type: String},
	last:{type: String}
});

//creamos un nuevo metodo llamado encryptPassword le pasamos la contraseña que ponga el usuario y la siframos 10 veses y retornamos su valor
userSchema.methods.encryptPassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//creamos un metodo llamado comparePassword y lo prosamos con una funcion a la cual le pasamos la contraseña que el usuario coloque y le decimos que compare la contraseña que el usuario pone con la que ya esta e la base de datos cifrada y que me retorne el resultado que puede ser un verdadero o un falso
userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password,this.password);
};
module.exports=mongoose.model('users',userSchema);
