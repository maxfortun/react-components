import Debug from 'debug';
const debug = Debug('@maxfortun:react-components:lib:hooks:useWebSocket');
import { EnhancedWebSocket } from '@maxfortun/enhanced-websocket';

import {
	useEffect,
	useRef,
	useState,
} from 'react';

export function useWebSocket(props) {
	const {
		ref: provided_ref,
		url,
		protocols,
		options
	} = props || {};

	const ref = provided_ref || useRef(null);
	const [ ready, set_ready ] = useState(false);
	const [ error, set_error ] = useState(null);

	const open_websocket = () => {
		debug('Opening', url, protocols);

		const new_ws = new EnhancedWebSocket(url, protocols, options);

		const handle_open = () => {
			debug('Open');
			set_error(null);
			set_ready(true);
		};

		const handle_error = (event) => {
			debug('Error', event);
			set_ready(false);
			set_error(event);
		};

		const handle_close = () => {
			debug('Closed');
			set_ready(false);
		};

		new_ws.addEventListener('open', handle_open);
		new_ws.addEventListener('error', handle_error);
		new_ws.addEventListener('close', handle_close);

		ref.current = new_ws;

		return () => {
			new_ws.removeEventListener('open', handle_open);
			new_ws.removeEventListener('error', handle_error);
			new_ws.removeEventListener('close', handle_close);
		};
	};

	const close_websocket = () => {
		if(!ref.current) {
			debug('Already closed', url, protocols);
			return;
		}
		debug('Closing', url, protocols);
		ref.current?.close();
		ref.current = null;
	};

	useEffect(() => {
		if(!url) {
			debug('useEffect: no url');
			return;
		}

		const remove_listeners = open_websocket();

		return () => {
			remove_listeners?.();
			close_websocket();
		};
	}, [ url, protocols ]);

	return [ ref, ready, error ];
}

export default useWebSocket;
