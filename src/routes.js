import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ChartPage from './pages/chart';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/chart' component={ChartPage} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
