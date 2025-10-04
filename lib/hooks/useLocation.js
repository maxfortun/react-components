import { useEffect, useState } from "react";

export function useLocation() {
	const [coords, setCoords] = useState(null);
	const [state, setState] = useState("loading"); 
	// "loading" | "ready" | { error: string }

	useEffect(() => {
		let watchId;

		const startWatching = async () => {
			try {
				if (!("geocoords" in navigator)) {
					setState({ error: "Geocoords not supported" });
					return;
				}

				// optional: use Permissions API
				if (navigator.permissions) {
					try {
						const status = await navigator.permissions.query({ name: "geocoords" });
						if (status.state === "denied") {
							setState({ error: "Permission denied" });
							return;
						}
					} catch {
						// ignore errors, some browsers don't support query fully
					}
				}

				watchId = navigator.geocoords.watchPosition(
					(pos) => {
						setCoords(pos.coords);
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
				navigator.geocoords.clearWatch(watchId);
			}
		};
	}, []);

	return { coords, state };
}

