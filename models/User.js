const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
		},
		role: {
			type: String,
			enum: ['user'],
			default: 'user',
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: [6, 'Password should be atleast 6 characters long'],
			// Select vajadzīgs ja mēs sūtīsim GET requestus lai dabūtu useri, mēs nesūtīsim viņiem paroli.
			select: false,
		},
		resetPasswordToken: String,
		resetPasswordExpire: Date,
	},
	{
		timestamps: true,
	}
);

//  ----------Encrypt password using bcrypt, before we save user in database.
UserSchema.pre('save', async function (next) {
	// Generate salt
	const salt = await bcrypt.genSalt(10);
	// Hash password with salt
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

//  ----------Sign JWT and return. methods are used on user instance
UserSchema.methods.getSignedJwtToken = function () {
	// Parakstam tokenu. payloadā ieliekam lietotāja id nummuru
	// {payload, secret, options}
	return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
	});
};

//  ----------Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
	// compare entered password to password that this user got crypted and saved under "password:"
	// this. šajā gadījumā mērķē uz pašu user instanci, nevis uz visu modeli.
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
