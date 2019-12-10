const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const imageSchema = Schema({
	title:{type: String},
	description:{type: String},
	filename:{type: String},
	path:{type: String},
	originalname:{type: String},
	mimetype:{type: String},
	size:{type: Number},
	status:{
		default:false,
		type:Boolean
	},
	created_at: {type: Date, default: Date.now()}

});

module.exports=mongoose.model('Image',imageSchema);
