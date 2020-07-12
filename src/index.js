import React from 'react';
import ReactDOM from 'react-dom';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import LoadingIndicator from './components/LoadingIndicator';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<LoadingIndicator />
			<App />
		</MuiPickersUtilsProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
