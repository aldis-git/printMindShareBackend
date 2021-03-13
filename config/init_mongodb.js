const mongoose = require('mongoose');

// Piekonektēties lokālajai var arī šādi:

// mongoose
//   .connect('mongodb://localhost:27017', { dbName: 'db_nosaukums', useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
//   .then(() => {
//     console.log('connected to mongodb');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('Connected to MongoDB.');
	})
	.catch((err) => console.log(err));

mongoose.connection.on('connected', () => {
	console.log('Mongoose connected to db');
});

mongoose.connection.on('error', (err) => {
	console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose connection is disconnected.');
});

// Events kad uzspied terminālī Ctrl+C, kas atslēdz aplikāciju 'SIGINT'.
process.on('SIGINT', async () => {
	// Sagaidam kad mongoose atslēdzas no datu bāzes.
	await mongoose.connection.close();
	// Apstādinam aplikāciju:
	process.exit();
});
