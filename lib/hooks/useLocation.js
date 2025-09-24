import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "useLocation_declined";

export function useLocation(prompt) {
	const [location, setLocation] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [declined, setDeclined] = useState(
		localStorage.getItem(STORAGE_KEY) === "true"
	);

	const requestLocation = useCallback(() => {
		if (!("geolocation" in navigator)) {
			setError("Geolocation is not supported by this browser.");
			return;
		}

		setLoading(true);
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setLocation(pos);
				setLoading(false);
			},
			(err) => {
				if (err.code === err.PERMISSION_DENIED) {
					localStorage.setItem(STORAGE_KEY, "true");
					setDeclined(true);
				}
				setError(err.message);
				setLoading(false);
			}
		);
	}, []);

	useEffect(() => {
		if (declined) return;

		if ("permissions" in navigator && navigator.permissions) {
			navigator.permissions.query({ name: "geolocation" }).then((result) => {
				if (result.state === "granted") {
					requestLocation();
				} else if (result.state === "prompt") {
					const message =
						prompt ||
						"We need your location to display the map correctly. Do you want to allow it?";
					if (window.confirm(message)) {
						requestLocation();
					} else {
						localStorage.setItem(STORAGE_KEY, "true");
						setDeclined(true);
					}
				} else {
					localStorage.setItem(STORAGE_KEY, "true");
					setDeclined(true);
				}
			});
		} else {
			const message =
				prompt ||
				"We need your location to display the map correctly. Do you want to allow it?";
			if (window.confirm(message)) {
				requestLocation();
			} else {
				localStorage.setItem(STORAGE_KEY, "true");
				setDeclined(true);
			}
		}
	}, [declined, prompt, requestLocation]);

	return { location, loading, error, declined };
}

