import React, { Component } from 'react';

import { Bar, Line } from 'react-chartjs-2';

// import './styles.css';

export default class ChartComponent extends Component {
	render() {
		return(
			<>
				<h1>Chart Component</h1>

				<nav>
					<div id="chart-tabs" className="nav nav-tabs" role="tablist">
						<a id="line-chart-tab" className="nav-item nav-link" data-toggle="tab" href="#line-chart" role="tab" aria-controls="line-chart" aria-selected="true">Linha</a>
						<a id="bar-chart-tab" className="nav-item nav-link" data-toggle="tab" href="#bar-chart" role="tab" aria-controls="bar-chart" aria-selected="false">Barra</a>

						<a id="pie-chart-tab" className="nav-item nav-link disabled" data-toggle="tab" href="#pie-chart" role="tab" aria-controls="pie-chart" aria-selected="false">Pizza</a>
					</div>
				</nav>

				<div id="chart-tabs-content" className="tab-content">
					<div id="line-chart" className="tab-pane fade show active" role="tabpanel" aria-labelledby="line-chart-tab">
						<Line
							data={this.props.chart.data}
							height={500}
							width={0}
							options={{
								maintainAspectRatio: false,
								title: {
									display: true,
									text: this.props.chart.title,
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
					<div id="bar-chart" className="tab-pane fade show active" role="tabpanel" aria-labelledby="bar-chart-tab">
						<Bar
							data={this.props.chart.data}
							height={500}
							width={0}
							options={{
								maintainAspectRatio: false,
								title: {
									display: true,
									text: this.props.chart.title,
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
					<div id="pie-chart" className="tab-pane fade show active" role="tabpanel" aria-labelledby="pie-chart-tab">

					</div>
				</div>
			</>
		);
	}
}
