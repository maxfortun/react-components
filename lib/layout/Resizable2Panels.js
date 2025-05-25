import React, { useRef, useState } from 'react';

import {
	Box,
	IconButton
} from '@mui/material';

import {
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
    VerticalAlignCenter as VerticalAlignCenterIcon
} from '@mui/icons-material';

import ResizableBox from './ResizableBox';

import useLocalStorage from '../hooks/useLocalStorage';

export default function Resizable2Panels(props) {

	const ref = useRef();

	const defaultWidth = props.defaultWidth || 320;

	// eslint-disable-next-line no-unused-vars
	const [ minWidth, setMinWidth ] = useState(32);

	// eslint-disable-next-line no-unused-vars
	const [ maxWidth, setMaxWidth ] = useState(props.maxWidth || window.innerWidth - 100);
	const [ customWidth, setCustomWidth ] = useLocalStorage((props.id+'C'||'c') + 'ustomWidth', defaultWidth);
	const [ width, setWidth ] = useState(customWidth);

	const handleResize = (event, element, params) => {
		setCustomWidth(params.width);
		setWidth(params.width);
	};

	return <Box
		sx={{
			display: 'inline-flex',
			width: 1,
			height: 1,
			overflowY: 'hidden'
		}}
	>
		<ResizableBox
			{...props.resizableBoxProps}
			sx={{
				width
			}}
			resizeRight={true}
			onResizeStop={handleResize}
		>
			<Box
				ref={ref}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					width: '100%',
					bgcolor: 'background.surface',
					borderRight: '3px ridge',
					borderColor: 'divider'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						borderBottom: 1,
						borderColor: 'divider'
					}}>
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
				<Box
					sx={{
						flexGrow: 1,
						height: '100%',
						width: '100%'
					}}
				>
					{props.leftPanel}
				</Box>
			</Box>
		</ResizableBox>
		<Box
			sx={{
				height: '100%',
				flexGrow: 1,
				overflowY: 'hidden'
			}}
		>
			{props.rightPanel}
		</Box>
	</Box>;
}

