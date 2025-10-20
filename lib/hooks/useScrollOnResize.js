import Debug from 'debug';
const debug = Debug('@maxfortun:react-components:lib:hooks:useScrollOnResize');

import { useEffect, useRef } from 'react';

import useResizeObserver from './useResizeObserver.js';
import useMutationObserver from './useMutationObserver.js';

export function useScrollOnResize(ref, behavior = 'smooth') {
	const dimensions = useResizeObserver(ref);
	const mutations = useMutationObserver(ref);

	const autoScroll = useRef(true);
	const lastScrollTop = useRef(0);
	const direction = useRef(null);

	useEffect(() => {
		const scrollable = ref.current;
		if(!scrollable) {
			return;
		}

		const atBottom = () => {
			return scrollable.scrollHeight - scrollable.scrollTop - scrollable.clientHeight <= 1;
		}

		const onUserInteraction = () => {
			if(atBottom()) {
				return;
			}
			debug('onUserInteraction');
			autoScroll.current = false;
		};

		['wheel', 'touchstart', 'mousedown'].forEach(event =>
			scrollable.addEventListener(event, onUserInteraction)
		);

		const onScroll = () => {
			if (autoScroll.current) {
				return;
			}

			const currentTop = scrollable.scrollTop;
			direction.current =
				currentTop > lastScrollTop.current
					? 'down'
					: currentTop < lastScrollTop.current
					? 'up'
					: null;

			lastScrollTop.current = currentTop;

			autoScroll.current = atBottom();

			debug('onScroll', autoScroll.current);
		};

		scrollable.addEventListener('scroll', onScroll);

		return () => {
			['wheel', 'touchstart', 'mousedown'].forEach(event =>
				scrollable.removeEventListener(event, onUserInteraction)
			);
			scrollable.removeEventListener('scroll', onScroll);
		};
	}, [ref.current]);

	useEffect(() => {
		const scrollable = ref.current;
		if(!scrollable || !autoScroll.current) {
			return;
		}

		scrollable.scrollTo({
			top: scrollable.scrollHeight,
			behavior
		});

	}, [dimensions, mutations]);
}

export default useScrollOnResize;
