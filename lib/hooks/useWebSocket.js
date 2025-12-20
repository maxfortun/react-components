import Debug from 'debug';
const debug = Debug('@maxfortun:react-components:lib:hooks:useWebSocket');
import { EnhancedWebSocket } from '@maxfortun/enhanced-websocket';

import {
	useEffect,
	useState,
} from 'react';

export function useWebSocket(props) {
	const {
		url,
		protocols,
	} = props;

	const [ ws, set_ws ] = useState(null);

	const [ ready, set_ready ] = useState(false);
	const [ error, set_error ] = useState(null);

	const open_websocket = () => {
		debug('Opening', url, protocols);

		const new_ws = new EnhancedWebSocket(url, protocols, {
			maxEnqueuedMessages: 1000
		});

		new_ws.addEventListener('open', async event => {
			debug('Open', event);
			set_error(null);
			set_ready(true);
		});

		new_ws.addEventListener('error', event => {
			debug('Error', event);
			set_ready(false);
			set_error(event);
		});
	
		new_ws.addEventListener('close', event => {
			debug('Closed', event);
			set_ready(false);
		});

		set_ws(new_ws);
	};

	const close_websocket = () => {
		ws?.close();
		set_ws(null);
	};

	useEffect(() => {
		open_websocket();
		return () => {
			close_websocket();
		};
	}, []);

	return [ ws, ready, error ];
}

export default useWebSocket;
