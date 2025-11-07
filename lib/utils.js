export const copyObj = obj => {
	const plain = {};
	for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))) {
		const desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), key);
		if (desc && typeof desc.get === "function" && obj[key]) {
			plain[key] = obj[key]; // trigger getter
		}
	}
	return plain;
};

export const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

export default {
	copyObj,
	sleep,
};

