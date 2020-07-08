import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import MyChart from '../MyChart';

// import './styles.css';

export default function ChartComponent({ chartData }) {
	const [key, setKey] = useState('line-chart');

	const options = {
		scales: {
			yAxes: [{
				ticks: {
					min: 0,
				}
			}]
		}
	};

	return(
		<Tabs id='chart-tabs'
			activeKey={key}
			onSelect={ k => setKey(k) }
			unmountOnExit
		>
			<Tab eventKey='line-chart' title='Linha'>
				<MyChart
					chartData={chartData}
					type='line'
					options={options}
				/>
			</Tab>
			<Tab eventKey='bar-chart' title='Barra'>
				<MyChart
					chartData={chartData}
					type='bar'
					options={options}
				/>
			</Tab>
			<Tab eventKey='pie-chart' title='Pizza' disabled>

			</Tab>
		</Tabs>
	);
}
