import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Chart from './pages/chart';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/chart' component={Chart} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
