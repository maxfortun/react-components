import useExternalState from './useExternalState.js';

export default function useURLSearchParam(key, defaultValue) {
	return useExternalState(key, defaultValue,
		() => {
			const urlSearchParams = new URLSearchParams(window.location.search);
			return urlSearchParams.get(key);
		},
		value => {
			const urlSearchParams = new URLSearchParams(window.location.search);
			if(value) {
				urlSearchParams.set(key, value);
			} else {
				urlSearchParams.delete(key);
			}
			window.history.pushState(null, '', window.location.pathname + '?' + urlSearchParams.toString());
		}
	);
}

