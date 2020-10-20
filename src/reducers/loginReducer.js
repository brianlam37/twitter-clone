import loginService from '../services/login';
import tweetService from '../services/tweets';
export const login = loginInfo => {
	return async dispatch => {
		const user = await loginService.login(loginInfo);
		dispatch({
			type: 'LOGIN',
			user,
		});
	};
};
export const getLoggedIn = () => {
	return {
		type: 'GET_LOGGED_IN',
	};
};
export const logout = () => {
	return {
		type: 'LOGOUT',
	};
};
const reducer = (state = null, action) => {
	switch(action.type){
		case 'LOGIN':{
			window.localStorage.setItem('loggedUser', JSON.stringify(action.user));
			tweetService.setToken(action.user.token);
			return action.user;
		}
		case 'GET_LOGGED_IN':{
			const loggedUserJSON = window.localStorage.getItem('loggedUser');
			if (loggedUserJSON) {
				const user = JSON.parse(loggedUserJSON);
				tweetService.setToken(user.token);
				return user;
			}
			return state;
		}
		case 'LOGOUT':{
            window.localStorage.removeItem('loggedUser');
			return null;
		}
		default:
			return state;
	}
};

export default reducer;