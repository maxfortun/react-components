import React, { useRef, useState, useEffect } from 'react';
import { Box } from '@mui/material';

export default function ResizableBox(props) {
	const {
		sx,
		children,
		onResizeStop,
		resizeRight,
		resizeBottom,
		resizeCorner
	} = props;

	const boxRef = useRef(null);

	const [resizing, setResizing] = useState({ active: false, direction: null });

	const startResize = direction => event => {
		event.preventDefault();
		setResizing({ active: true, direction });
	};

	const doResize = event => {
		if (!resizing.active || !boxRef.current) return;

		const box = boxRef.current;
		const rect = box.getBoundingClientRect();

		if (resizing.direction === 'right' || resizing.direction === 'corner') {
			const newWidth = event.clientX - rect.left;
			box.style.width = `${newWidth}px`;
		}

		if (resizing.direction === 'bottom' || resizing.direction === 'corner') {
			const newHeight = event.clientY - rect.top;
			box.style.height = `${newHeight}px`;
		}

	};

	const stopResize = event => {
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
		window.addEventListener('mousemove', doResize);
		window.addEventListener('mouseup', stopResize);
		return () => {
			window.removeEventListener('mousemove', doResize);
			window.removeEventListener('mouseup', stopResize);
		};
	}, [resizing]);

	return <Box
		ref={boxRef}
		sx={{
			...sx,
			position: 'relative',
			minWidth: 'min-content'
		}}
	>
		{children}
		{ resizeRight && <Box
			onMouseDown={startResize('right')}
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
			onMouseDown={startResize('bottom')}
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
			onMouseDown={startResize('corner')}
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

