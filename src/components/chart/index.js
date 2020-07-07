import React, { Component } from 'react';

import MyChart from './MyChart';
// import { Line, Bar } from 'react-chartjs-2';

// import './styles.css';

export default class ChartComponent extends Component {
	render() {
		const options = {
			scales: {
				yAxes: [
					{
						ticks: {
							min: 0,
							max: 100
						}
					}
				]
			}
		};

		return(
			<>
				<ul id="chart-tabs" className="nav nav-tabs" role="tablist">
					<li className="nav-item">
						<a id="line-chart-tab" className="nav-link active" data-toggle="tab" href="#line-chart" role="tab" aria-controls="line-chart" aria-selected="true">Linha</a>
					</li>
					<li className="nav-item">
						<a id="bar-chart-tab" className="nav-link" data-toggle="tab" href="#bar-chart" role="tab" aria-controls="bar-chart" aria-selected="false">Barra</a>
					</li>
					<li className="nav-item">
						<a id="pie-chart-tab" className="nav-link disabled" data-toggle="tab" href="#pie-chart" role="tab" aria-controls="pie-chart" aria-selected="false">Pizza</a>
					</li>
				</ul>

				<div id="chart-tabs-content" className="tab-content">
					<div id="line-chart" className="tab-pane fade show active" role="tabpanel" aria-labelledby="line-chart-tab">
						<MyChart
							data={this.props.chart.data}
							title={this.props.chart.title}
							type='line'
							options={options}
							color="#70CA"
						/>
					</div>
					<div id="bar-chart" className="tab-pane fade" role="tabpanel" aria-labelledby="bar-chart-tab">
						<MyChart
							data={this.props.chart.data}
							title={this.props.chart.title}
							type='bar'
							options={options}
							color="#70CA"
						/>
					</div>

					<div id="pie-chart" className="tab-pane fade" role="tabpanel" aria-labelledby="pie-chart-tab">

					</div>
				</div>
			</>
		);
	}
}
