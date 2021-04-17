import localStorageExp from './local-storage-exp.js';
import { JOKE_ALL_RATED, JOKE_NEXT_INDEX_RATED, JOKE_RATED_TTL } from './constants.js';
import jokeAPI from './joke-api.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const renderJoke = (joke) => {
	const jokeElement = $('.joke');
	const html = `<div class="joke__id">${joke._id}</div>
                <div class="joke__content">${joke.content}</div>`;
	jokeElement.innerHTML = html;
};

const onRated = (evt, jokes, indexRef, callback) => {
	if (indexRef.value < jokes.length) {
		const jokeIDElement = $('.joke .joke__id');
		const jokeID = jokeIDElement.innerText;

		callback(jokeID);
		localStorageExp.setItemExp(JOKE_NEXT_INDEX_RATED, { index: indexRef.value + 1 }, JOKE_RATED_TTL);

		if (indexRef.value !== jokes.length - 1) {
			renderJoke(jokes[++indexRef.value]);
		} else {
			handleJokeAllRated();
		}
	}
};

const handleJokeAllRated = () => {
	const jokeElement = $('.joke');
	const jokeActionElement = $('.joke-action');
	const jokeAllRatedlement = $('.joke-all-rated');

	jokeElement.classList.add('joke--hidden');
	jokeActionElement.classList.add('joke-action--hidden');
	jokeAllRatedlement.classList.add('joke-all-rated--display');

	localStorage.removeItem(JOKE_NEXT_INDEX_RATED);
	localStorageExp.setItemExp(JOKE_ALL_RATED, { jokeAllRated: true }, JOKE_RATED_TTL);
};

const startApp = async () => {
	const jokeAllRated = localStorageExp.getItemExp(JOKE_ALL_RATED);
	const jokeNextIndexRated = localStorageExp.getItemExp(JOKE_NEXT_INDEX_RATED);
	const indexRef = { value: jokeNextIndexRated?.index || 0 };

	if (!jokeAllRated) {
		const { jokes } = await jokeAPI.getJokes();
		renderJoke(jokes[indexRef.value]);

		const btnFunnyElement = $('#btn-funny');
		const btnNotFunnyElement = $('#btn-not-funny');
		btnFunnyElement.addEventListener('click', (evt) => onRated(evt, jokes, indexRef, jokeAPI.ratedFunny));
		btnNotFunnyElement.addEventListener('click', (evt) => onRated(evt, jokes, indexRef, jokeAPI.ratedNotFunny));
	} else {
		handleJokeAllRated();
	}
};

startApp();
