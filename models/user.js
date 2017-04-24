exports = module.exports = function(app, mongoose) {
	var userSchema = new mongoose.Schema({
		name: 		{ type: String },
		age: 		{ type: Number },
		username: 	{ type: String },
		email:  	{ type: String },
		genre: 		{
			type: String,
			enum: ['Female', 'Male']
		},
		bio: 	{ type: String }
	});
	mongoose.model('User', userSchema);
};
