import { useState, useEffect } from 'react';

export default function useExternalState(key, defaultValue, getExternalValue, setExternalValue) {
	const [value, setValue] = useState(() => {
		const externalValue = getExternalValue();
		if(null != externalValue) {
			return externalValue;
		}
		return defaultValue;
	});
	useEffect(() => setExternalValue(value), [key, value]);
	return [value, setValue];
}

