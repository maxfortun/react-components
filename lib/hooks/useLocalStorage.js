import useExternalState from './useExternalState.js';

export function useLocalStorage(key, defaultValue) {
	return useExternalState(key, defaultValue,
		() => {
			try {
				return JSON.parse(window.localStorage.getItem(key));
			// eslint-disable-next-line no-unused-vars
			} catch(e) {
				return null;
			}
		},
		value => {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
	);
}

export default useLocalStorage;
