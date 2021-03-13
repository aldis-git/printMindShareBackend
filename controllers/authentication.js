const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async.js');
const User = require('../models/User.js');

// @desc	Register user
// @route	POST /api/v1/authentication/register
// @access	Public
exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password, role } = req.body;

	// Create user
	const user = await User.create({
		name,
		email,
		password,
		role,
	});

	// Create token for this user
	// const token = user.getSignedJwtToken();
	// res.status(200).json({ success: true, token });

	// Send token and cookies with token
	sendTokenResponse(user, 200, res);
});

// @desc	Login user
// @route	POST /api/v1/authentication/login
// @access	Public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (typeof password === 'number') {
		console.log('error');
		return next(new ErrorResponse('Password needs to be of type String', 400));
	}

	// Validate email & password
	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and password', 400));
	}

	// Check for user
	// pēc tam kad atrodam epastu datu bāzē tiek izmantots ".select('+password')".
	// tas ir tādēļ ka mēs User modelī uz "password:" uzlikām "select: false,", bet mums vajag passwordu šeit.
	const user = await User.findOne({ email }).select('+password');

	// If user does not exist
	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	// Check if password matches
	const isMatch = await user.matchPassword(password);

	// If password does not match
	if (!isMatch) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	// Create token for this user
	// const token = user.getSignedJwtToken();
	// res.status(200).json({ success: true, token });

	// Send token and cookies with token
	sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, response) => {
	// Create token for this user
	const token = user.getSignedJwtToken();
	const role = user.role;

	const options = {
		// Cik ilgi gribam lai ir derīgs cookie, milisekundēs. 3600000 milisekundes = 1h
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 3600000000000000),
		// Only allow access cookie through clien side script
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	// 1) set status code
	// 2) send cookie ("cookie_name", value, options). Arī iekš cookie sūtam pašu tokenu
	// 3) send json data
	response.status(statusCode).cookie('token', token, options).json({ success: true, token, role });
};

// @desc	Log user out / clear cookie
// @route	GET /api/v1/authentication/logout
// @access	Private
exports.logout = asyncHandler(async (req, res, next) => {
	// Kad logojamies ārā uzliekam cookie ar nosaukumu token un vērtību 'none', kā arī iestatam ļoti ātru izbeigšanās laiku.
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10000),
		httpOnly: true,
	});
	res.status(200).json({ success: true, data: {} });
});

// @desc	Get current logged in user
// @route	POST /api/v1/authentication/me
// @access	Private
exports.getMe = asyncHandler(async (req, res, next) => {
	//res.user.id mēs iestatam iekš authentication middlevāres, kad protektojam routes.
	const user = await User.findById(req.user.id);

	res.status(200).json({ success: true, data: user });
});
