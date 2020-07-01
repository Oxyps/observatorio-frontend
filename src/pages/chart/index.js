import React, { Component } from 'react';

// import './styles.css';

import FormComponent from '../../components/form';
import ChartComponent from '../../components/chart';

import api from '../../services/api';

export default class Chart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				informations: [],
				locations: [],
				granularities: [],
			},
			chartData: {
				labels: ['Boston', 'Springfield', 'Cambridge', 'Bosto', 'Springfiel', 'Cambridg'],
				datasets: [
					{
						label: 'Population',
						data: [10, 20, 30, 40, 50, 60]
					}
				]
			}
		};
	}

	loadInfo = async () => {
		const informationResponse = await api.get('/chart/information');
		const locationResponse = await api.get('/chart/location');
		const granularityResponse = await api.get('/chart/granularity');

		this.setState({
			formData: {
				informations: informationResponse.data,
				locations: locationResponse.data,
				granularities: granularityResponse.data
			}
		});
	}

	componentDidMount() {
		this.loadInfo();
	}

	render() {
		const { formData } = this.state;
		const { chartData } = this.state;

		return(
			<div id="chart-page">
				<FormComponent  formData={formData} />
				<ChartComponent chartData={chartData} />
			</div>
		);
	}
}
