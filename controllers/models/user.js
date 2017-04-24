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
		bio: 	{ type: String },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	});
	// Sets the createdAt parameter equal to the current time
	userSchema.pre('save', next => {
	  now = new Date();
	  if(!this.createdAt) {
	    this.createdAt = now;
	  }
	  next();
	});
	userSchema.pre('update', next => {
	  now = new Date();
	  if(!this.updatedAt) {
	    this.updatedAt = now;
	  }
	  next();
	});

	mongoose.model('User', userSchema);
};
