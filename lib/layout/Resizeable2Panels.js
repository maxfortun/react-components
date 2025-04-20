import React, { useState } from 'react';

import {
	Box,
	IconButton
} from '@mui/material';

import {
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
    VerticalAlignCenter as VerticalAlignCenterIcon
} from '@mui/icons-material';

import { Resizable } from 're-resizable';

import useLocalStorage from '../hooks/useLocalStorage';

export default function Resizeable2Panels(props) {

	const defaultWidth = props.defaultWidth || 320;

	// eslint-disable-next-line no-unused-vars
	const [ minWidth,	setMinWidth	] = useState(1);
	// eslint-disable-next-line no-unused-vars
	const [ maxWidth,	setMaxWidth	] = useState(props.maxWidth || window.innerWidth - 100);
	const [ customWidth, setCustomWidth ] = useLocalStorage('customWidth', defaultWidth);
	const [ width, setWidth ] = useState(customWidth);

	const handleResize = async (event, direction, refToElement, delta) => {
		const nextWidth = width + delta.width;
		setCustomWidth(nextWidth);
		setWidth(customWidth);
	};

	return <Box
		sx={{
			display: 'inline-flex',
			width: 1
		}}
	>
		<Resizable
			defaultSize={{
				width: width
			}}
			minWidth={minWidth}
			size={{ width }}
			onResizeStop={handleResize}
			style={{
				display: 'inline-table',
			}}
		>
			<Box
				sx={{
					height: '100vh',
					width: '100%',
					bgcolor: 'background.surface',
					borderRight: '3px ridge',
					borderColor: 'divider',
					pr: '2px'
				}}
			>

				<Box sx={{ display: 'flex' }}>
					<IconButton onClick={ () => setWidth(minWidth) }>
						<ChevronLeftIcon />
					</IconButton>
					<Box sx={{ width: '50%' }} />
					<IconButton onClick={ () => setWidth(customWidth) }>
						<VerticalAlignCenterIcon sx={{ transform: 'rotate(90deg)' }} />
					</IconButton>
					<Box sx={{ width: '50%' }} />
					<IconButton onClick={ () => setWidth(maxWidth) }>
						<ChevronRightIcon />
					</IconButton>
				</Box>
				<Box>
					{props.leftPanel}
				</Box>
			</Box>
		</Resizable>
		<Box
			sx={{
				flexGrow: 100
			}}
		>
			{props.rightPanel}
		</Box>
	</Box>;
}

