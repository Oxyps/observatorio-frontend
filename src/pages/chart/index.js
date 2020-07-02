import React, { Component } from 'react';

import FormComponent from '../../components/form';
import ChartComponent from '../../components/chart';

import axios from 'axios';
import api from '../../services/api';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

export default class Chart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				informations: [],
				locations: [],
				granularities: [],
				loaded: false
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

	loadFormData = async () => {
		await axios
			.all([
				api.get('/chart/information'),
				api.get('/chart/location'),
				api.get('/chart/granularity')
			])
			.then(axios.spread( (...responses) => {
				this.setState({
					formData: {
						informations: responses[0].data,
						locations: responses[1].data,
						granularities: responses[2].data,
						loaded: true
					}
				});
			}))
			.catch(errors => {
				console.log(errors);
			})
		;
	}

	componentDidMount() {
		this.loadFormData();
	}

	handleGetChartData = async data => {
		console.log(data);
	}

	render() {
		const { formData } = this.state;
		const { chartData } = this.state;

		return(
			<Container fluid>
			{
				(formData.loaded &&
				<Row>
					<Col md={4} xs={4} lg={4}>
						<FormComponent onSubmit={this.handleGetChartData} formData={formData} />
					</Col>
					<Col md={8} xs={8} lg={8}>
						<ChartComponent chartData={chartData} />
					</Col>
				</Row>)
				||
				<Row>
					<Col md={{offset: 6}}>
						<Spinner animation="grow"/>
					</Col>
				</Row>
			}
			</Container>
		);
	}
}
