/* COPY FROM MATERIAL-UI DOC */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import { Typography } from '@material-ui/core';
import _ from 'lodash/fp';

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  	const { data, index, style } = props;
	return React.cloneElement(data[index], {
		style: {
			...style,
			top: style.top + LISTBOX_PADDING,
		},
	});
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
	const outerProps = React.useContext(OuterElementContext);

	return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
	const ref = React.useRef(null);

	React.useEffect(() => {
		if (ref.current != null) {
		ref.current.resetAfterIndex(0, true);
		}
	}, [data]);
	return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
	const { children, ...other } = props;
	const itemData = React.Children.toArray(children);
	const theme = useTheme();
	const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
	const itemCount = itemData.length;
	const itemSize = smUp ? 36 : 48;

	const getChildSize = (child) => {
		if (React.isValidElement(child) && child.type === ListSubheader) {
			return 48;
		}

		return itemSize;
	};

	const getHeight = () => {
		if (itemCount > 8) {
			return 8 * itemSize;
		}
		return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
	};

	const gridRef = useResetCache(itemCount);

	return (
		<div ref={ref}>
			<OuterElementContext.Provider value={other}>
				<VariableSizeList
					itemData={itemData}
					height={getHeight() + 2 * LISTBOX_PADDING}
					width='100%'
					ref={gridRef}
					outerElementType={OuterElementType}
					innerElementType='ul'
					itemSize={(index) => getChildSize(itemData[index])}
					overscanCount={5}
					itemCount={itemCount}
				>
					{renderRow}
				</VariableSizeList>
			</OuterElementContext.Provider>
		</div>
	);
});

ListboxComponent.propTypes = {
  	children: PropTypes.node,
};

const useStyles = makeStyles({
	listbox: {
		boxSizing: 'border-box',
			'& ul': {
			padding: 0,
			margin: 0,
		},
	},
});

const renderGroup = (params) => {
	console.log(params);

	return params.children;
	// return [
	// 	<ListSubheader key={params.key} component='div'>
	// 		{params.group}
	// 	</ListSubheader>,
	// 	params.children,
	// ];
}

export default function VirtualizedSelect(props) {
  	const classes = useStyles();

	function getLocations() {
		let newArray = [];
		Object.keys(props.data).map(group =>
			props.data[group].map(location =>
				newArray.push(location.name+' '+group+' '+location.state)
			)
		);

		return newArray;
	}

	return (
		<Autocomplete
			disableListWrap
			classes={classes}
			ListboxComponent={ListboxComponent}
			renderOption={(option) => <Typography noWrap>{option}</Typography>}
			renderGroup={renderGroup}
			options={getLocations()}
			getOptionSelected={(option, value) => _.isEqual(option, value)}
			// groupBy={ option => option[0].toUpperCase() }
			renderInput={ params =>
				<TextField
					{...params} label='Selecione a localização'
					error={props.error} margin='normal'
				/>
			}
			onChange={props.onChange}
			noOptionsText='Nenhuma opção encontrada'
			fullWidth
			autoComplete
		/>
  	);
}
