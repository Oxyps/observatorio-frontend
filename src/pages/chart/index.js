import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import 'blueimp-canvas-to-blob/js/canvas-to-blob.min';
import { saveAs } from 'file-saver';

import api from '../../services/api';
import FormComponent from '../../components/form';
import ChartComponent from '../../components/chart';

import './styles.css';

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
			api.get(`/chart/search-data/?information_nickname=${params.information}&location_name=${params.locationName}&location_type=${params.locationType}&location_state=${params.locationState}&granularity=${params.granularity}&in_date_gt=${params.inDate}&until_date_lte=${params.untilDate}`)
		);

		const chart = {
			title: response.data.datasets[0].label,
			color: params.color,
			labels: response.data.until_dates,
			datasets: [
				{
					label: params.locationName +' '+ params.locationType +' '+ params.locationState,
					data: response.data.datasets[0].data
				}
			]
		}

		setChartData(chart);
	}

	function handleSaveChart() {
		const canvasElement = document.getElementsByTagName('canvas')[0];

		canvasElement.toBlob( blob => {
			saveAs(blob, 'chart.png');
		});
	}

	useEffect(() => {
		loadFormData();
	}, []);

	return(
		<>
			<aside>
				{/* <strong>Formulário</strong> */}
				<FormComponent
					onSubmit={handleGetChartData}
					informations={informations}
					locations={locations}
					granularities={granularities}
				/>
			</aside>
			<hr className="solid"/>
			<main>
				{/* <strong>Gráfico</strong> */}
				<ChartComponent chartData={chartData} />
				<Button id='save-chart'
					variant='contained'
					startIcon={<SaveIcon />}
					onClick={handleSaveChart}
				>Salvar gráfico</Button>
			</main>
		</>
	);
}
