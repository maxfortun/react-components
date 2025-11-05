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

		const startWatching = async () => {
			try {
				if (!('geolocation' in navigator)) {
					setState({ error: 'Geolocation not supported' });
					return;
				}

				// optional: use Permissions API
				if (navigator.permissions) {
					try {
						const status = await navigator.permissions.query({ name: 'geolocation' });
						if (status.state == 'denied') {
							setState({ error: 'Permission denied.' });
							return;
						}

						if (status.state == 'prompt' && onPrompt) {
							const res = await new Promise((resolve, reject) => {
								navigator.geolocation.getCurrentPosition(
									pos => resolve(pos),
									err => resolve(err),
									{
										timeout: 4000,
										maximumAge: 0
									}
								);
							});
							if(!res.coords) {
								const promptResponse = await onPrompt();
								if(!promptResponse) {
									setState({ error: 'User cancelled.' });
									return;
								}
							}
						}
					} catch {
						// ignore errors, some browsers don't support query fully
					}
				}

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
			} catch (err) {
				setState({ error: err.message });
			}
		};

		startWatching();

		return () => {
			if (watchId !== undefined) {
				navigator.geolocation.clearWatch(watchId);
			}
		};
	}, []);

	return { coords, state };
}

export default useLocation;

