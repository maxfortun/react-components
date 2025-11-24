import { useEffect, useState } from 'react';

import { copyObj } from '../utils';

import useLocalStorageState from './useLocalStorageState.js';

export function useLocation(props) {
	const {
		onPrompt,
		prompt_response_key = 'location_prompt_response',
	} = props;

	const watchOpts = Object.assign({
		enableHighAccuracy: true,
		maximumAge: 10000,
		timeout: 20000,
	}, props?.watchOpts);

	const [coords, setCoords] = useState(null);
	const [state, setState] = useState('loading');
	// 'loading' | 'ready' | { error: string }

	const [ prompt_response, set_prompt_response ] = useLocalStorageState(prompt_response_key, null);

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

			if (permissionState == 'prompt' && onPrompt && prompt_response == null) {
				const promptAccepted = await onPrompt();
				set_prompt_response(promptAccepted);
				if(!promptAccepted) {
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

	}, []);

	return { coords, state, prompt_response, set_prompt_response };
}

export default useLocation;

