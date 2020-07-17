import React, { useState } from 'react';

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TimelineIcon from "@material-ui/icons/Timeline";
import BarChartIcon from "@material-ui/icons/BarChart";
import PieChartIcon from "@material-ui/icons/PieChart";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import MultilineChartIcon from "@material-ui/icons/MultilineChart";
import DonutSmallIcon from "@material-ui/icons/DonutSmall";

import TabPanel from './TabPanel';
import NewChart from './NewChart';

import './styles.css';

export default function ChartComponent({ chartData }) {
	const [tabKey, setTabKey] = useState(0);

	const options = {
		scales: {
			yAxes: [{
				ticks: {
					min: 0,
				}
			}]
		},
	};

	const getTabProps = (index) => {
		return {
			id: `scrollable-force-tab-${index}`,
			"aria-controls": `scrollable-force-tabpanel-${index}`
		};
	};

	const handleChangeTab = (event, newKey) => {
		setTabKey(newKey);
	};

	return(
		<>
			<AppBar position='static' color='default'>
				<Tabs
					value={tabKey}
					onChange={handleChangeTab}
					variant='scrollable'
					scrollButtons='on'
					indicatorColor='primary'
					textColor='primary'
					aria-label='scrollable force tabs chart'
				>
					<Tab label='Linha'
						icon={<TimelineIcon />}
						{...getTabProps(0)}
					/>
					<Tab label='Barra'
						icon={<BarChartIcon />}
						{...getTabProps(1)}
					/>
					<Tab label='Bolha' disabled
						icon={<BubbleChartIcon />}
						{...getTabProps(2)}
					/>
					<Tab label='Pizza' disabled
						icon={<PieChartIcon />}
						{...getTabProps(4)}
					/>
					<Tab label='Donut' disabled
						icon={<DonutSmallIcon />}
						{...getTabProps(3)}
					/>
					<Tab label='Multilinhas' disabled
						icon={<MultilineChartIcon />}
						{...getTabProps(5)}
					/>
				</Tabs>
			</AppBar>
			<TabPanel tabKey={tabKey} tabIndex={0}>
				<NewChart
					chartData={chartData}
					type='line'
					options={options}
				/>
			</TabPanel>
			<TabPanel tabKey={tabKey} tabIndex={1}>
				<NewChart
					chartData={chartData}
					type='bar'
					options={options}
				/>
			</TabPanel>
			<TabPanel tabKey={tabKey} tabIndex={2}>
				Bolhas
			</TabPanel>
			<TabPanel tabKey={tabKey} tabIndex={3}>
				Donut
			</TabPanel>
			<TabPanel tabKey={tabKey} tabIndex={4}>
				Pizza
			</TabPanel>
			<TabPanel tabKey={tabKey} tabIndex={5}>
				Multilinhas
			</TabPanel>
		</>
	);
}
