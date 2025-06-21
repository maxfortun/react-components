import React, { useRef, useState, useEffect } from 'react';
import { Box } from '@mui/material';

export default function ResizableBox(props) {
	const {
		children,
		onResizeStop,
		resizeRight,
		resizeBottom,
		resizeCorner
	} = props;

	const boxRef = useRef(null);

	const [resizing, setResizing] = useState({ active: false, direction: null });
	const [width, setWidth] = useState(props.width);
	const [height, setHeight] = useState(props.height);

	useEffect(() => {
		setWidth(props.width);
	}, [ props.width ]);

	useEffect(() => {
		setHeight(props.height);
	}, [ props.height ]);

	const startResize = direction => event => {
		event.preventDefault();
		setResizing({ active: true, direction });
	};

	const doResize = event => {
		if (!resizing.active || !boxRef.current) return;

		const box = boxRef.current;
		const rect = box.getBoundingClientRect();

		if (resizing.direction === 'right' || resizing.direction === 'corner') {
			setWidth(event.clientX - rect.left);
		}

		if (resizing.direction === 'bottom' || resizing.direction === 'corner') {
			setHeight(event.clientY - rect.top);
		}
	};

	const stopResize = event => {
		if (!resizing.active || !boxRef.current) return;
		if(onResizeStop) {
			const box = boxRef.current;
			const rect = box.getBoundingClientRect();

			const params = {
				direction: resizing.direction,
				width: event.clientX - rect.left,
				height: event.clientY - rect.top
			};
			onResizeStop(event, box, params);
		}
		setResizing({ active: false, direction: null });
	};

	useEffect(() => {
		window.addEventListener('pointermove', doResize);
		window.addEventListener('pointerup', stopResize);
		return () => {
			window.removeEventListener('pointermove', doResize);
			window.removeEventListener('pointerup', stopResize);
		};
	}, [resizing]);

	return <Box
		ref={boxRef}
		sx={{
			width: width+'px',
			position: 'relative',
			minWidth: 'min-content'
		}}
	>
		{children}
		{ resizeRight && <Box
			onPointerDown={startResize('right')}
			sx={{
				width: '5px',
				height: '100%',
				position: 'absolute',
				top: 0,
				right: 0,
				cursor: 'ew-resize',
				backgroundColor: 'transparent',
				zIndex: 2,
			}}
		/> }

		{ resizeBottom && <Box
			onPointerDown={startResize('bottom')}
			sx={{
				height: '5px',
				width: '100%',
				position: 'absolute',
				bottom: 0,
				left: 0,
				cursor: 'ns-resize',
				backgroundColor: 'transparent',
				zIndex: 2,
			}}
		/> }

		{ resizeCorner && <Box
			onPointerDown={startResize('corner')}
			sx={{
				width: '10px',
				height: '10px',
				position: 'absolute',
				bottom: 0,
				right: 0,
				cursor: 'nwse-resize',
				backgroundColor: 'gray',
				zIndex: 3,
			}}
		/> }
	</Box>;
}

