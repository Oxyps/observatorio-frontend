import React, { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { GithubPicker } from 'react-color';

import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ptBR from 'date-fns/locale/pt-BR';
import DateFnsUtils from "@date-io/date-fns";

import _ from 'lodash/fp';

import VirtualizedSelect from './VirtualizedSelect'

import './styles.css';

export default function FormComponent(props) {
	const [information, setInformation] = useState();
	const [location, setLocation] = useState();
	const [granularity, setGranularity] = useState();
	const [inDate, setInDate] = useState();
	const [untilDate, setUntilDate] = useState();
	const [color, setColor] = useState();

	const { handleSubmit, errors, control } = useForm({
		mode: 'onChange',
		submitFocusError: false,
	});

	async function submit() {
		//yyyy-mm-dd format dates
		const ISOinDate = inDate.toISOString().slice(0, 10);
		const ISOuntilDate = untilDate.toISOString().slice(0, 10);
		const [ locationName, locationType, locationState ] = location.split(' - ');

		let rgbColor = undefined;
		if(color) rgbColor = 'rgba('+color.rgb.r+','+color.rgb.g+','+color.rgb.b+',0.5)';

		await props.onSubmit({
			information,
			locationName,
			locationType,
			locationState,
			granularity,
			inDate: ISOinDate,
			untilDate: ISOuntilDate,
			color: rgbColor
		});
	}

	return(
		<form
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit(submit)}
		>
			<div id="select-wrapper">
				<Controller
					name='information'
					control={control}
					rules={{ required: true }}
					render={ controllerProps => (
						<Autocomplete
							onChange={ (_, selected) => {
								setInformation(selected?.nickname);
								controllerProps.onChange(selected?.nickname);
							}}
							options={props.informations}
							getOptionLabel={ option => option.nickname }
							getOptionSelected={(option, value) => _.isEqual(option, value)}
							renderInput={ params =>
								<TextField
									{...params} label='Selecione a informação'
									error={!!errors.information}
									margin='normal'
								/>
							}
							noOptionsText='Nenhuma opção encontrada'
							fullWidth
							autoComplete
						/>
					)}
				/>
			</div>

			<div id="select-wrapper">
				<Controller
					name='location'
					control={control}
					rules={{ required: true }}
					render={ controllerProps => (
						<VirtualizedSelect
							onChange={ (_, selected) => {
								setLocation(selected);
								controllerProps.onChange(selected);
							}}
							data={props.locations}
							error={!!errors.location}
						/>
					)}
				/>
			</div>

			<div id="select-wrapper">
				<Controller
					name='granularity'
					control={control}
					rules={{ required: true }}
					render={ controllerProps => (
						<Autocomplete
							onChange={ (_, selected) => {
								setGranularity(selected?.granularity);
								controllerProps.onChange(selected?.granularity);
							}}
							options={props.granularities}
							getOptionLabel={ option => option.granularidade }
							getOptionSelected={(option, value) => _.isEqual(option, value)}
							renderInput={ params =>
								<TextField
									{...params} label='Selecione a granularidade'
									error={!!errors.granularity}
									margin='normal'
								/>
							}
							noOptionsText='Nenhuma opção encontrada'
							fullWidth
							autoComplete
						/>
					)}
				/>
			</div>

			<MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
				<div id="date-wrapper">
					<Controller
						name='inDate'
						control={control}
						rules={{
							required: 'Campo necessário.',
							validate: date => {
								if(String(date) === 'Invalid Date') return 'Data inválida, formato dd/mm/yyyy.';
								else if(date?.getTime() < new Date('1999-01-01')) return 'A data deve ser maior que o limite mínimo (01/01/1999).';
								else if(date?.getTime() > new Date('2022-01-01')) return 'A data deve ser menor que o limite máximo (01/01/2022).';
								else if(date?.getTime() >= new Date(untilDate)) return `A data inicial deve ser menor que a data final.`
							}
						}}
						defaultValue={null}
						render={ props => (
							<KeyboardDatePicker
								onChange={ date => {
									setInDate(date);
									props.onChange(date);
								}}
								value={props.value}
								error={!!errors.inDate}
								helperText={errors.inDate?.message}
								format='dd/MM/yyyy'
								views={['year', 'month', 'date']}
								openTo='year'
								minDate={new Date('1999-01-01')}
								maxDate={new Date('2022-01-01')}
								label='Data inicial'
								clearable
								disableFuture
								cancelLabel='Cancelar'
								clearLabel='Limpar'
								okLabel='Confirmar'
							/>
						)}
					/>
				</div>
				<div id="date-wrapper">
					<Controller
						name='untilDate'
						control={control}
						rules={{
							required: 'Campo necessário.',
							validate: date => {
								if(String(date) === 'Invalid Date') return 'Data inválida, formato dd/mm/yyyy.';
								else if(date?.getTime() < new Date('1999-01-01')) return 'Data menor que o limite: 01/01/1999.';
								else if(date?.getTime() > new Date('2022-01-01')) return 'Data maior que o limite: 01/01/2022.';
								else if(date?.getTime() <= new Date(inDate)) return `A data final deve ser maior que a data inicial.`
							}
						}}
						defaultValue={null}
						render={props => (
							<KeyboardDatePicker
								onChange={date => {
									setUntilDate(date);
									props.onChange(date);
								}}
								value={props.value}
								error={!!errors.untilDate}
								helperText={errors.untilDate?.message}
								format='dd/MM/yyyy'
								views={['year', 'month', 'date']}
								openTo='year'
								minDate={new Date('1999-01-01')}
								maxDate={new Date('2022-01-01')}
								label='Data final'
								clearable
								disableFuture
								cancelLabel='Cancelar'
								clearLabel='Limpar'
								okLabel='Confirmar'
							/>
						)}
					/>
				</div>
			</MuiPickersUtilsProvider>

			<div id="color-wrapper">
				<label>Cor desejada:</label>
				<GithubPicker
					id='color'
					name='color'
					triangle='hide'
					width='212px'
					color={color}
					onChangeComplete={ color => setColor(color)}
				/>
			</div>

			<Button type='submit'
				fullWidth
				variant='contained'
				color='secondary'
			>Gerar gráfico</Button>
		</form>
	);
}
