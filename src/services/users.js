import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const get = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
}

const create = async newObject => {
	const response = await axios.post(baseUrl, newObject);
	return response.data;
};

const userService = {
    create, 
    getAll,
    get
}
export default userService;