import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

import './styles.css';

const LoadingIndicator = props => {
	const { promiseInProgress } = usePromiseTracker();

	return promiseInProgress && (
		<div id="loader-wrapper">
			<Loader type='ThreeDots' color='#4a524' height='130' width='130'/>
		</div>
	);
}

export default LoadingIndicator;
