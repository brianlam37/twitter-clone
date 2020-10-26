import userService from '../services/users';

export const create = user => {
	return async dispatch => {
		const newUser = await userService.create(user);
		dispatch({
			type: 'CREATE',
			user:newUser
		});
	};
};

export const initUser = () => {
	return async dispatch => {
		const users = await userService.getAll();
		dispatch({
			type: 'INIT_USER',
			users
		});
	};
};

const reducer = (state = [], action) => {
	let copy = [...state];
	switch(action.type){
		case 'INIT_USER':{
			return action.users;
        }
		default:
			return copy;
	}
};

export default reducer;