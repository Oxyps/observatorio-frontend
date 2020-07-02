import React, { Component } from 'react';

import { Bar, Line } from 'react-chartjs-2';

import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export default class ChartComponent extends Component {
	render() {
		return(
			<Container>
				<h1>Chart Component</h1>

				<Tabs defaultActiveKey="line" unmountOnExit={true} mountOnEnter={true} id="chart-tabs">
					<Tab eventKey="line" title="Linhas">
						<Line
							data={this.props.chartData}
							height={500}
							width={0}
							options={{
								maintainAspectRatio: false,
								title: {
									display: true,
									text: 'Titulo',
									fontSize: 25
								},
								legend: {
									display: true,
									position: 'right',
									labels: {
										fontColor: '#000'
									}
								},
								layout: {
									padding: {
										left: 50,
										right: 0,
										bottom: 0,
										top: 0
									}
								},
								tooltips: {
									enabled: true
								}
							}}
						/>
					</Tab>
					<Tab eventKey="bars" title="Barras">
						<Bar
							data={this.props.chartData}
							height={500}
							width={0}
							options={{
								maintainAspectRatio: false,
								title: {
									display: true,
									text: 'Titulo',
									fontSize: 25
								},
								legend: {
									display: true,
									position: 'right',
									labels: {
										fontColor: '#000'
									}
								},
								layout: {
									padding: {
										left: 50,
										right: 0,
										bottom: 0,
										top: 0
									}
								},
								tooltips: {
									enabled: true
								}
							}}
						/>
					</Tab>
					<Tab eventKey="pie" title="Pizza" disabled>

					</Tab>
				</Tabs>
			</Container>
		);
	}
}
