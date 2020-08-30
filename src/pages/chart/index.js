import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

import { IconButton } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

import 'blueimp-canvas-to-blob/js/canvas-to-blob.min';
import { saveAs } from 'file-saver';
import { ExportToCsv } from 'export-to-csv';

import api from '../../services/api';
import FormComponent from '../../components/form';
import ChartComponent from '../../components/chart';
import MenuButton from '../../components/material/MenuButton';

import './styles.css';

export default function ChartPage() {
	const [error, setError] = useState(false);
	const [informations, setInformations] = useState([]);
	const [locations, setLocations] = useState([]);
	const [granularities, setGranularities] = useState([]);

	const [chartData, setChartData] = useState({
		title: '',
		color: '',
		dataset: []
	})

	async function loadFormData() {
		await trackPromise(axios
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
		await trackPromise(api
			.get(`/chart/search-data/?information_nickname=${params.information}&location_name=${params.locationName}&location_type=${params.locationType}&location_state=${params.locationState}&granularity=${params.granularity}&in_date_gt=${params.inDate}&until_date_lte=${params.untilDate}`)
			.then(response => {
				setChartData({
					title: response.data.title,
					color: params.color,
					dataset: response.data.dataset
				});
				setError(false);
			})
			.catch(errors => {
				setChartData({
					title: '',
					color: '',
					dataset: []
				})
				setError(true);
			})
		);
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
			<Collapse in={error} id='alert'>
				<Alert
					severity='error'
					action={
						<IconButton
							aria-label='close'
							color='inherit'
							size='small'
							onClick={() => {
								setError(false);
							}}
						>
							<CloseIcon fontSize='inherit' />
						</IconButton>
					}
				>
					Dados não encontrados, assegure-se de estar inserindo o período e a granularidade corretamente.
				</Alert>
			</Collapse>

			<div id="page">
				<aside>
					<h1 id="title">
						O E C T &amp; I G
					</h1>
					<h2 id="subtitle">
						Observatório Econômico de Ciência, Tecnologia e Inovação de Guarapuava
					</h2>

					<FormComponent
						onSubmit={handleGetChartData}
						informations={informations}
						locations={locations}
						granularities={granularities}
					/>
				</aside>
				<hr />
				<main>
					<ChartComponent chartData={chartData} />
					<MenuButton
						handleExportImage={handleExportImage}
						handleExportJson={handleExportJson}
						handleExportCsv={handleExportCsv}
					/>
				</main>
			</div>
		</>
	);
}
