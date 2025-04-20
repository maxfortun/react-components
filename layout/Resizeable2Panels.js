import React, { useEffect, useRef, useState } from 'react';

import {
	Box,
	Button,
	CircularProgress,
	ClickAwayListener,
	Grid,
	FormControl,
	FormControlLabel,
	FormLabel,
	Icon,
	IconButton,
	InputAdornment,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Radio,
	RadioGroup,
	Snackbar,
	Switch,
	TextField,
	Tooltip,
	Typography
} from '@mui/material';

import {
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
    VerticalAlignCenter as VerticalAlignCenterIcon
} from '@mui/icons-material';

import { Resizable } from 're-resizable';

import { useLocalStorage } from './utils';

export default function (props) {

	const defaultWidth = props.defaultWidth || 320;

	const [ minWidth,	setMinWidth	] = useState(1);
	const [ maxWidth,	setMaxWidth	] = useState(props.maxWidth || window.innerWidth - 100);
	const [ customWidth, setCustomWidth ] = useLocalStorage('customWidth', defaultWidth);
	const [ width, setWidth ] = useState(customWidth);

	useEffect(() => {
		setWidth(customWidth);
	}, [customWidth]);

	const handleResize = async (event, direction, refToElement, delta) => {
		const nextWidth = width + delta.width;
		setCustomWidth(nextWidth);
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
					<IconButton onClick={ event => setWidth(minWidth) }>
						<ChevronLeftIcon />
					</IconButton>
					<Box sx={{ width: '50%' }} />
					<IconButton onClick={ event => setWidth(customWidth) }>
						<VerticalAlignCenterIcon sx={{ transform: 'rotate(90deg)' }} />
					</IconButton>
					<Box sx={{ width: '50%' }} />
					<IconButton onClick={ event => setWidth(maxWidth) }>
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

