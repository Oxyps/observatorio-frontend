import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

import 'blueimp-canvas-to-blob/js/canvas-to-blob.min';
import { saveAs } from 'file-saver';
import { ExportToCsv } from 'export-to-csv';

import api from '../../services/api';
import FormComponent from '../../components/form';
import ChartComponent from '../../components/chart';
import MenuButton from '../../components/material/MenuButton';

import './styles.css';

export default function ChartPage() {
	const [informations, setInformations] = useState([]);
	const [locations, setLocations] = useState([]);
	const [granularities, setGranularities] = useState([]);

	const [chartData, setChartData] = useState({
		title: '',
		color: '',
		dataset: []
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
		const { data } = await trackPromise(
			api.get(`/chart/search-data/?information_nickname=${params.information}&location_name=${params.locationName}&location_type=${params.locationType}&location_state=${params.locationState}&granularity=${params.granularity}&in_date_gt=${params.inDate}&until_date_lte=${params.untilDate}`)
		);

		setChartData({
			title: data.title,
			color: params.color,
			dataset: data.dataset
		});
	}

	function handleExportImage() {
		const canvasElement = document.getElementsByTagName('canvas')[0];

		canvasElement.toBlob( blob => {
			saveAs(blob, 'chart.png');
		});
	}

	const handleExportJson = () => {
		const blob = new Blob([JSON.stringify(chartData)], { type: 'application/json' });
		saveAs(blob, 'chart.json');
	};

	const handleExportCsv = () => {
		const options = {
			fieldSeparator: ',',
			quoteStrings: '"',
			decimalSeparator: '.',
			showLabels: true,
			showTitle: true,
			title: chartData.title,
			useTextFile: false,
			filename: 'chart',
			useBom: true,
			useKeysAsHeaders: true,
			// headers: ['date', 'data']
		}

		const csvExporter = new ExportToCsv(options);
		csvExporter.generateCsv(chartData.dataset);
	};

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
				<MenuButton
					handleExportImage={handleExportImage}
					handleExportJson={handleExportJson}
					handleExportCsv={handleExportCsv}
				/>
			</main>
		</>
	);
}
