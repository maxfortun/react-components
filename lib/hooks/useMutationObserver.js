import useRefElement from './useRefElement.js';

export function useMutationObserver(ref, options) {
	if(!options) {
		options = { childList: true, subtree: true };
	}

	const [mutations, setMutations] = useRefElement(
		ref,
		element => {
			const observer = new MutationObserver(_mutations => {
				setMutations(_mutations);
			});

			observer.observe(element, options);

			return observer.disconnect();
		},
	);

	return mutations;
}

export default useMutationObserver;
