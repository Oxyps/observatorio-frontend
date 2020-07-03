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
			form: {
				loaded: false,
				data: {
					informations: [],
					locations: [],
					granularities: []
				}
			},
			chart: {
				title: '',
				data: {
					labels: [],
					datasets: [
						{
							label: '',
							data: []
						}
					]
				}
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
			.then(axios.spread( (infRes, locRes, granRes) => {
				this.setState({
					form: {
						loaded: true,
						data: {
							informations: infRes.data,
							locations: locRes.data,
							granularities: granRes.data
						}
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

	handleGetChartData = async params => {
		const pluck = (key, array) =>
		array.reduce((values, current) => {
			values.push(current[key]);

			return values;
		}, []);

		const response = await api.get(`/chart/data/?information_nickname=${params.information}&location_name=${params.location}&granularity=${params.granularity}&in_date_gt=${params.inDate}&until_date_lte=${params.untilDate}`);

		const untilDates = pluck('until_date', response.data);
		const data = pluck('data', response.data);

		const chart = {
			title: params.information,
			data: {
				labels: untilDates,
				datasets: [
					{
						label: params.location,
						data
					}
				]
			}
		}

		this.setState({ chart });
	}

	render() {
		const { form, chart } = this.state;

		return(
			<Container fluid>
			{
				(form.loaded &&
				<Row>
					<Col md={4} xs={4} lg={4}>
						<FormComponent onSubmit={this.handleGetChartData} formData={form.data} />
					</Col>
					<Col md={8} xs={8} lg={8}>
						<ChartComponent chart={chart} />
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
