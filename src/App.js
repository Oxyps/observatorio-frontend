import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import Routes from './routes';
import createMuiTheme from './components/theme';

import './global.css';

function App() {
	return(
		<ThemeProvider theme={createMuiTheme}>
			<Routes />
		</ThemeProvider>
	);
}

export default App;
