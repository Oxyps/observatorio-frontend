import React, { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
// import { DevTool } from 'react-hook-form-devtools';

import { GithubPicker } from 'react-color';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ptBR from 'date-fns/locale/pt-BR';
import DateFnsUtils from "@date-io/date-fns";

import VirtualizedSelect from './VirtualizedSelect'

// import './styles.css';

export default function FormComponent(props) {
	const [information, setInformation] = useState('');
	const [location, setLocation] = useState('');
	const [granularity, setGranularity] = useState('');
	const [inDate, setInDate] = useState({
		yearMonth: new Date(),
		day: new Date()
	});
	const [untilDate, setUntilDate] = useState({
		yearMonth: new Date(),
		day: new Date()
	});
	const [color, setColor] = useState('');

	const { handleSubmit, register, errors, control } = useForm({
		mode: 'onSubmit',
		submitFocusError: false
	});

	async function submit() {
		//yyyy-mm-dd format dates
		const inDateYearMonth = inDate.yearMonth.toISOString().slice(0,7);
		const inDateDay = inDate.day.toISOString().slice(7,10);
		const untilDateYearMonth = untilDate.yearMonth.toISOString().slice(0,7);
		const untilDateDay = untilDate.day.toISOString().slice(7,10);

		const [ locationName, locationType, locationState ] = location.split(' ')

		await props.onSubmit({
			information,
			locationName,
			locationType,
			locationState,
			granularity,
			inDate: inDateYearMonth + inDateDay,
			untilDate: untilDateYearMonth + untilDateDay,
			color
		})
	}

	return(
		<Form
			noValidate
			autoComplete='off'
			onSubmit={handleSubmit(submit)}
		>
			{/* <DevTool control={control} /> */}

			<Form.Group controlId='information'>
				<Form.Label>Informação:</Form.Label>
				<Autocomplete
					options={props.informations}
					getOptionLabel={ option => option.nickname }
					renderInput={ params =>
						<TextField
							{...params} label='Selecione um item'
							inputRef={register({ required: true })}
							name='information' variant='outlined'
							error={!!errors.information}
						/>
					}
					onChange={ (event, value) =>
						setInformation(value.nickname)
					}
					style={{ width: 360 }}
					autoComplete
					autoSelect
				/>
			</Form.Group>

			<Form.Group controlId='location'>
				<Form.Label>Localização:</Form.Label>
				<VirtualizedSelect
					name='location'
					register={register({ required: true })}
					data={props.locations}
					onChange={ (event, value) => setLocation(value) }
					error={!!errors.location}
				/>
			</Form.Group>

			<Form.Group controlId='granularity'>
				<Form.Label>Granularidade:</Form.Label>
				<Autocomplete
					options={props.granularities}
					getOptionLabel={ option => option.granularidade }
					renderInput={ params =>
						<TextField
							{...params} label='Selecione um item'
							inputRef={register({ required: true })}
							name='granularity' variant='outlined'
							error={!!errors.granularity}
						/>
					}
					onChange={ (event, value) =>
						setGranularity(value.granularity)
					}
					style={{ width: 360 }}
					autoComplete
					autoSelect
				/>
			</Form.Group>

			<Form.Group as={Row} controlId='inDate'>
				<Form.Label column md={3}>Início:</Form.Label>
				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
					<Col md={3}>
						<Controller as={
							<KeyboardDatePicker
								minDate='1990/01/01'
								maxDate='2022/01/01'
								format='dd'
								disableToolbar
								label='Dia'
								value={inDate.day}
								error={!!errors.inDateDay}
								invalidDateMessage='(dd)'
								style={{width: 80}}
							/>}
							name='inDateDay'
							control={control}
							rules={{ required: true }}
							onChange={ ([selected]) => {
								setInDate({ ...inDate, day: selected });
								return selected;
							}}
						/>
					</Col>
					<Col md={5}>
						<Controller as={
							<KeyboardDatePicker
								minDate='1990/01/01'
								maxDate='2022/01/01'
								openTo='year'
								views={['year', 'month']}
								format='MM/yyyy'
								label='Mês e ano'
								value={inDate.yearMonth}
								error={!!errors.inDateYearMonth}
								invalidDateMessage='(MM/yyyy)'
								style={{width: 140}}
							/>}
							name='inDateYearMonth'
							control={control}
							rules={{ required: true }}
							onChange={ ([selected]) => {
								setInDate({ ...inDate, yearMonth: selected });
								return selected;
							}}
						/>
					</Col>
				</MuiPickersUtilsProvider>
			</Form.Group>

			<Form.Group as={Row} controlId='untilDate'>
				<Form.Label column md={3}>Final:</Form.Label>
				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
					<Col md={3}>
						<Controller as={
							<KeyboardDatePicker
								minDate='1990/01/01'
								maxDate='2022/01/01'
								format='dd'
								disableToolbar
								label='Dia'
								value={inDate.day}
								error={!!errors.untilDateDay}
								invalidDateMessage='(dd)'
								style={{width: 80}}
							/>}
							name='untilDateDay'
							control={control}
							rules={{ required: true }}
							onChange={ ([selected]) => {
								setUntilDate({ ...untilDate, day: selected });
								return selected;
							}}
						/>
					</Col>
					<Col md={5}>
						<Controller as={
							<KeyboardDatePicker
								minDate='1990/01/01'
								maxDate='2022/01/01'
								openTo='year'
								views={['year', 'month']}
								format='MM/yyyy'
								label='Mês e ano'
								value={inDate.yearMonth}
								error={!!errors.untilDateYearMonth}
								invalidDateMessage='(MM/yyyy)'
								style={{width: 140}}
							/>}
							name='untilDateYearMonth'
							control={control}
							rules={{ required: true }}
							onChange={ ([selected]) => {
								setUntilDate({ ...untilDate, yearMonth: selected });
								return selected;
							}}
						/>
					</Col>
				</MuiPickersUtilsProvider>
			</Form.Group>

			<Form.Group as={Row} controlId='color'>
				<Form.Label column md={3}>Cor:</Form.Label>
				<Col md={9}>
					<GithubPicker
						id='color'
						name='color'
						triangle='hide'
						width='212px'
						color={color}
						onChangeComplete={ color => setColor(color.hex) }
					/>
				</Col>
			</Form.Group>

			<Form.Group as={Row}>
				<Col md={{ span: 6, offset: 4 }}>
					<Button type='submit' variant='secondary'>Gerar gráfico</Button>
				</Col>
			</Form.Group>
		</Form>
	);
}
