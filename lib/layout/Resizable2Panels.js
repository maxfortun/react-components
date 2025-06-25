import React, { useEffect, useRef, useState } from 'react';

import {
	Box,
	IconButton
} from '@mui/material';

import {
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import ResizableBox from './ResizableBox';

import useLocalStorage from '../hooks/useLocalStorage';

export default function Resizable2Panels(props) {

	const ref = useRef();

	const defaultWidth = props.defaultWidth || 320;

	const [ mode, setMode ] = useLocalStorage((props.id+'M'||'m') + 'ode', 'custom');

	const [ customWidth, setCustomWidth ] = useLocalStorage((props.id+'C'||'c') + 'ustomWidth', defaultWidth);
	const [ width, setWidth ] = useState(customWidth);

	useEffect(() => {
		if(mode == 'min') {
			setWidth(1);
		} else {
			setWidth(customWidth);
		}
	}, [ mode ]);

	const handleResize = (event, element, params) => {
		setCustomWidth(params.width);
		setWidth(params.width);
		setMode('custom');
	};

	const label = props.label && <Box
			onClick={ () => setMode('custom') }
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				cursor: 'pointer'
			}}
		>
			<Box
			   sx={{
					width: '100%',
					maxWidth: 'fit-content',
					height: '100%',
					textAlign: 'center',
					writingMode: 'sideways-lr',
					overflowY: 'auto',
					whiteSpace: 'nowrap',
					...props?.labelProps
				}}
			>
			{props.label}
			</Box>
	</Box>;

	return <Box
		sx={{
			display: 'inline-flex',
			width: 1,
			height: 1,
			overflow: 'hidden'
		}}
	>
		<ResizableBox
			{...Object.assign(
				{
					sx: {
						maxWidth: 'fit-content',
					}
				},
				props?.resizableBoxProps
			)}
			width={width}
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
					overflow: 'hidden',
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
						borderColor: 'divider',
						justifyContent: 'center'
					}}>
					{ mode == 'custom'
						&& <IconButton onClick={ () => setMode('min') }>
							<ChevronLeftIcon />
						</IconButton>
						|| <IconButton onClick={ () => setMode('custom') }>
								<ChevronRightIcon />
						</IconButton>
					}
				</Box>
				<Box
					sx={{
						flexGrow: 1,
						minHeight: 0,
						height: '100%',
						width: '100%',
						minWidth: 'min-content'
					}}
				>
					{ mode == 'custom'
						&& props.leftPanel
						|| label
					}
				</Box>
			</Box>
		</ResizableBox>
		<Box
			sx={{
				height: '100%',
				flexGrow: 1,
				minWidth: 0,
				overflow: 'hidden'
			}}
		>
			{props.rightPanel}
		</Box>
	</Box>;
}

