const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ComentarySchema = new Schema({
	name:{type: String},
	comentary:{type: String}
});

module.exports=mongoose.model('comentarys',ComentarySchema);
