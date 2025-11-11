import { useEffect, useState } from 'react';

import { copyObj } from '../utils';

export function useLocation(props) {
	const {
		onPrompt
	} = props;

	const watchOpts = Object.assign({
		enableHighAccuracy: true,
		maximumAge: 10000,
		timeout: 20000,
	}, props?.watchOpts);

	const [coords, setCoords] = useState(null);
	const [state, setState] = useState('loading');
	// 'loading' | 'ready' | { error: string }

	useEffect(() => {
		let watchId;

		const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

		const startWatching = async () => {
			if (!('geolocation' in navigator)) {
				setState({ error: 'Geolocation not supported' });
				return;
			}

			let permissionState = 'prompt';

			// Try Permissions API where supported (except Safari)
			if (!isSafari && navigator.permissions) {
				try {
					const status = await navigator.permissions.query({ name: 'geolocation' });
					permissionState = status.state;
				} catch {
					// ignore unsupported browsers
				}
			}

			if (permissionState == 'denied') {
				setState({ error: 'Permission denied.' });
				return;
			}

			if (permissionState === 'prompt' && onPrompt) {
				const promptResponse = await onPrompt();
				if(!promptResponse) {
					setState({ error: 'User cancelled.' });
					return;
				}
			}

			try {
				watchId = navigator.geolocation.watchPosition(
					(pos) => {
						setCoords(copyObj(pos.coords));
						setState('ready');
					},
					(err) => {
						setState({ error: err.message });
					},
					watchOpts
				);
			} catch (error) {
				setState({ error });
			}
		};

		startWatching();

		return () => {
			if (watchId !== undefined) {
				navigator.geolocation.clearWatch(watchId);
			}
		};

	}, [onPrompt]);

	return { coords, state };
}

export default useLocation;

