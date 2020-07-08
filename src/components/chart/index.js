import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import MyChart from '../MyChart';

// import './styles.css';

export default function ChartComponent({ chartTitle, chartData }) {
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
		>
			<Tab eventKey='line-chart' title='Linha'>
				<MyChart
					data={chartData}
					title={chartTitle}
					type='line'
					options={options}
					color='#70CA'
				/>
			</Tab>
			<Tab eventKey='bar-chart' title='Barra'>
				<MyChart
					data={chartData}
					title={chartTitle}
					type='bar'
					options={options}
					color='#70CA'
				/>
			</Tab>
			<Tab eventKey='pie-chart' title='Pizza' disabled>

			</Tab>
		</Tabs>
	);
}
