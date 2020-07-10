import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import 'bootstrap/dist/css/bootstrap.css';
import FormComponent from '../../components/form';
import ChartComponent from '../../components/chart';

import api from '../../services/api';

// import './styles.css';

export default function ChartPage() {
	const [informations, setInformations] = useState([]);
	const [locations, setLocations] = useState([]);
	const [granularities, setGranularities] = useState([]);

	const [chartData, setChartData] = useState({
		title: '',
		color: '',
		labels: [],
		datasets: [{
			label: '',
			data: []
		}]
	})

	async function loadFormData() {
		await trackPromise(
			axios
				.all([
					api.get('/chart/information'),
					api.get('/chart/location'),
					api.get('/chart/granularity')
				])
				.then(axios.spread( (infRes, locRes, granRes) => {
					setInformations(infRes.data);
					setLocations(locRes.data);
					setGranularities(granRes.data.data);
				}))
				.catch(errors => {
					// console.log(errors);
				})
		);
	}

	async function handleGetChartData(params) {
		const response = await trackPromise(
			api.get(`/chart/search-data/?information_nickname=${params.information}&location_name=${params.locationName}&location_type=${params.locationType}&granularity=${params.granularity}&in_date_gt=${params.inDate}&until_date_lte=${params.untilDate}`)
		);

		const chart = {
			title: response.data.datasets[0].label,
			color: params.color,
			labels: response.data.until_dates,
			datasets: [
				{
					label: params.locationName+' '+params.locationType,
					data: response.data.datasets[0].data
				}
			]
		}

		setChartData(chart);
	}

	useEffect(() => {
		loadFormData();
	}, []);

	return(
		<div className="container-fluid d-flex flex-column align-items-center justify-items-center">
			<div className="d-flex flex-row container-fluid">
				<div className="container-fluid col-4">
					<h1>Formulário</h1>
				</div>
				<div className="container-fluid col-4">
					<h1>Gráfico</h1>
				</div>
			</div>
			<div className="d-flex flex-row">
				<div className="container col-sm-4">
					<FormComponent
						onSubmit={handleGetChartData}
						informations={informations}
						locations={locations}
						granularities={granularities}
					/>
				</div>
				<div className="container d-flex flex-column col-sm-8">
					<ChartComponent chartData={chartData} />
				</div>
			</div>
		</div>
	);
}
