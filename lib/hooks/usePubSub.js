import { useRef, useEffect, useCallback } from 'react';

export function usePubSub() {
	const subscribersRef = useRef(new Set());

	const subscribe = useCallback((callback) => {
		subscribersRef.current.add(callback);
		return () => subscribersRef.current.delete(callback);
	}, []);

	const publish = useCallback((data) => {
		subscribersRef.current.forEach(callback => callback(data));
	}, []);

	return { subscribe, publish };
}

export default usePubSub;
