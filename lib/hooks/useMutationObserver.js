import useRefElement from './useRefElement.js';

export function useRefMutationObserver(ref, options) {
	if(!options) {
		options = { childList: true, subtree: true };
	}

	useRefElement(
		ref,
		(element, callback) => {
			const observer = new MutationObserver(_mutations => {
				callback(_mutations);
			});

			observer.observe(element, options);

			return () => observer.disconnect();
		},
	);
}

export default useRefMutationObserver;
