import React from 'react';

import Chart from 'chart.js';

export default class MyChart extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		this.myChart = new Chart(
			this.canvasRef.current, {
				type: this.props.type,
				options: this.props.options,
				data: {
					labels: this.props.data.labels,
					datasets: [{
						label: this.props.data.datasets[0].label,
						data: this.props.data.datasets[0].data,
						backgroundColor: this.props.color,
						pointRadius: 4,
						borderColor: this.props.color,
						borderWidth: 1,
						lineTension: 0
					}]
				}
			}
		);
	}

	render() {
		return <canvas height="190" ref={this.canvasRef} />
	}
}
