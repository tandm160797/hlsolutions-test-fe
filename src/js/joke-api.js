import { HOST } from './constants.js';

const jokeAPI = {
	async getJokes() {
		try {
			const url = `${HOST}/jokes/`;
			const res = await fetch(url);
			const data = await res.json();
			return data;
		} catch (err) {
			throw new Error(err.message);
		}
	},

	async ratedFunny(jokeID) {
		try {
			const url = `${HOST}/jokes/${jokeID}/funny-rated/`;
			const fetchOptions = {
				method: 'PATCH'
			};
			const res = await fetch(url, fetchOptions);
			const data = await res.json();
			return data;
		} catch (err) {
			throw new Error(err.message);
		}
	},

	async ratedNotFunny(jokeID) {
		try {
			const url = `${HOST}/jokes/${jokeID}/not-funny-rated/`;
			const fetchOptions = {
				method: 'PATCH'
			};
			const res = await fetch(url, fetchOptions);
			const data = await res.json();
			return data;
		} catch (err) {
			throw new Error(err.message);
		}
	}
};

export default jokeAPI;
