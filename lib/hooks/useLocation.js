import { useEffect, useState } from "react";

export function useLocation(props) {
	const {
		latDelta = 0,
		longDelta = 0,
		altDelta = 0
	} = props;
	const [coords, setCoords] = useState(null);
	const [newCoords, setNewCoords] = useState(null);
	const [state, setState] = useState("loading"); 
	// "loading" | "ready" | { error: string }

	useEffect(() => {
		if(
			Math.abs(newCoords.latitude - coords.latitude) > latDelta
			|| Math.abs(newCoords.longitude - coords.longitude) > longDelta
			|| Math.abs(newCoords.altitude - coords.altitude) > altDelta

		) {
			setCoords(newCoords);
		}
	}, [ newCoords ]);

	useEffect(() => {
		let watchId;

		const startWatching = async () => {
			try {
				if (!("geolocation" in navigator)) {
					setState({ error: "Geolocation not supported" });
					return;
				}

				// optional: use Permissions API
				if (navigator.permissions) {
					try {
						const status = await navigator.permissions.query({ name: "geolocation" });
						if (status.state === "denied") {
							setState({ error: "Permission denied" });
							return;
						}
					} catch {
						// ignore errors, some browsers don't support query fully
					}
				}

				watchId = navigator.geolocation.watchPosition(
					(pos) => {
						setNewCoords(pos.coords);
						setState("ready");
					},
					(err) => {
						setState({ error: err.message });
					},
					{
						enableHighAccuracy: true,
						maximumAge: 10000,
						timeout: 20000,
					}
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

