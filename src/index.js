import React from 'react';
import ReactDOM from 'react-dom';

import LoadingIndicator from './components/loader';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<LoadingIndicator />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
