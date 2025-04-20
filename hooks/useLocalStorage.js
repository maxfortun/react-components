import useExternalState from './useExternalState.js';

export const useLocalStorage = (key, defaultValue) => {
	return useExternalState(key, defaultValue,
		() => {
			try {
				return JSON.parse(window.localStorage.getItem(key));
			} catch(e) {
				debug('useLocalStorage init', key, e);
				return null;
			}
		},
		value => {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
	);
};

export default {
	useLocalStorage
};
