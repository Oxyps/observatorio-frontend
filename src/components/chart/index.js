import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

// import './styles.css';

export default class ChartComponent extends Component {
	render() {
		return(
			<div id="chart-component">
				<h1>Chart Component</h1>
				<Line
					data={this.props.chartData}
					width={15}
					height={10}
					options={{
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
			</div>
		);
	}
}
