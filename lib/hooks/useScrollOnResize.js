import { useEffect, useRef } from "react";

function useScrollOnResize(ref) {
	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const observer = new ResizeObserver(() => {
			// container resized, scroll to bottom
			ref.current.scrollTo({
				top: ref.current.scrollHeight,
				behavior: "smooth"
			});
		});

		observer.observe(ref.current);

		return () => observer.disconnect();
	}, [ref]);
}

