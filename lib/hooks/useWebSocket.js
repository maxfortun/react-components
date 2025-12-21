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
		ref = useRef(null),
		url,
		protocols,
		options
	} = props;

	const [ ready, set_ready ] = useState(false);
	const [ error, set_error ] = useState(null);

	const open_websocket = () => {
		debug('Opening', url, protocols);

		const new_ws = new EnhancedWebSocket(url, protocols, options);

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

		ref.current = new_ws;
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
		if(ref.current) {
			debug('useEffect: already opened');
			return;
		}

		if(!url) {
			debug('useEffect: no url');
			return;
		}

		open_websocket();			

		return () => {		  
			close_websocket();
		};
	}, [ url, protocols ]);

	return [ ref, ready, error ];
}

export default useWebSocket;
