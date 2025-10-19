import useRefElement from './useRefElement.js';

export function useMutationObserver(ref, options) {
	if(!options) {
		options = { childList: true, subtree: true };
	}

	return useRefElement(
		ref,
		element => {
			const observer = new MutationObserver(_mutations => {
				setMutations(_mutations);
			});

			observer.observe(element, options);

			return observer.disconnect();
		},
	);
}

export default useMutationObserver;
