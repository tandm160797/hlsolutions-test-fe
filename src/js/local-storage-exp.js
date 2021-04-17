const setItemExp = (key, value, ttl) => {
	const exp = Date.now() + ttl;
	const item = { value, exp };
	localStorage.setItem(key, JSON.stringify(item));
};

const getItemExp = (key) => {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) {
		return null;
	}

	const item = JSON.parse(itemStr);
	const exp = Date.now();
	if (exp > item.exp) {
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
};

const localStorageExp = {
	setItemExp,
	getItemExp
};

export default localStorageExp;
