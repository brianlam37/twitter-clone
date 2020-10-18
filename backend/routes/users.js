const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('tweets');
	response.json(users);
});

usersRouter.post('/', async (request, response) => {
	const body = request.body;

	if(body.password.length >= 3){
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(body.password, saltRounds);

		const user = new User({
			username: body.username,
			name: body.name,
            passwordHash,
            date: new Date()
        });
 
        const savedUser = await user.save();
        response.json(savedUser);

	}else{
		return response.status(400).json({
			error: 'password length is too short'
		});
	}
});

module.exports = usersRouter;