const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    .populate({
        path: 'tweets',
        populate: { 
            path: 'author',
            select: {name: 1, username: 1},
        },
    })
    .populate({
        path: 'likes',
        populate: { 
            path: 'author likes',
            select: {name: 1, username: 1},
        },
    })
	response.json(users);
});
usersRouter.get('/:id', async (request, response) => {
    const users = await User.findById(request.params.id)
        .populate('tweets')
        .populate('likes')
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