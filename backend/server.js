const express = require('express')
require('dotenv').config();
const cors = require('cors')
const app = express();
const tweetRouter = require('./routes/tweets')
const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message);
	})

app.use(cors());

app.use(express.json());
app.set('json spaces', 2);
app.use(middleware.tokenExtractor);
app.use('/api/tweets', tweetRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.errorHandler);

// app.use(express.static('build'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});