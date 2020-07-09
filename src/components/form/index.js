import React, { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { GithubPicker } from 'react-color';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';

// import './styles.css';

registerLocale('pt_BR', ptBR);

export default function FormComponent({ formData, onSubmit }) {
	const { handleSubmit, register, errors, control } = useForm();

	const [form, setForm] = useState({});

	async function submit(event) {
		// event.preventDefault();

		let {
			information,
			location,
			granularity,
			inDate,
			untilDate,
			color
		} = form;

		//yyyy-mm-dd format dates
		inDate = inDate.toISOString().slice(0,10);
		untilDate = untilDate.toISOString().slice(0,10);

		const [ locationName, locationType ] = location.split('_')

		await onSubmit({
			information,
			locationName,
			locationType,
			granularity,
			inDate,
			untilDate,
			color
		})
	}

	return(
		<form className="d-flex flex-column"
			onSubmit={handleSubmit(submit)}
		>
			<div id="information" className="form-group row">
				<label htmlFor="information" className="col-sm-3 col-form-label">Informação:</label>
				<div className="col-sm-9">
					<select
						ref={register({required: true})}
						id="information"
						name="information"
						className={`custom-select ${errors.information && 'is-invalid'}`}
						onChange={ e => setForm({ ...form, information: e.target.value }) }
					>
						<option value="">Selecione um item</option>
						{formData.informations.map(information => {
							return(
								<option
									key={information.id}
									value={information.nickname}
								>{information.nickname}</option>
							)
						})}
					</select>
				</div>
			</div>

			<div id="location" className="form-group row">
				<label htmlFor="location" className="col-sm-3 col-form-label">Localização:</label>
				<div className="col-sm-9">
					<select
						ref={register({required: true})}
						id="location"
						name="location"
						className={`custom-select ${errors.location && 'is-invalid'}`}
						onChange={ e => setForm({ ...form, location: e.target.value })}
					>
						<option value="">Selecione um item</option>
						{
							Object.keys(formData.locations).map( group =>{
								return(
									formData.locations[group].map( location => {
										return(
											<option
												key={location.id}
												value={location.name+'_'+group}
											>
												{location.name+' '+group}
											</option>
										)
									})
								)
							})
						}
					</select>
				</div>
			</div>

			<div id="granularity" className="form-group row">
				<label htmlFor="granularity" className="col-sm-3 col-form-label">Granularidade:</label>
				<div className="col-sm-9">
					<select
						ref={register({required: true})}
						id="granularity"
						name="granularity"
						className={`custom-select ${errors.granularity && 'is-invalid'}`}
						onChange={ e => setForm({ ...form, granularity: e.target.value }) }
					>
						<option value="">Selecione um item</option>
						{formData.granularities.map(granularity =>
							<option
								key={granularity.id}
								value={granularity.granularity}
							>{granularity.granularidade}</option>
						)}
					</select>
				</div>
			</div>

			<div id="in-date" className="form-group row">
				<label htmlFor="inDate" className="col-sm-3 col-form-label">Data de:</label>
				<div className="col-sm-9">
					<Controller
						as={
							<DatePicker
								placeholderText='Escolha a data inicial'
								selected={form.inDate}
								peekNextMonth
								showMonthDropdown
								showYearDropdown
								dropdownMode='select'
								className={`form-control ${errors.inDate && 'is-invalid'}`}
								dateFormat='dd/MM/yyyy'
								locale='pt_BR'
							/>
						}
						name='inDate'
						control={control}
						rules={{ required: true }}
						onChange={ ([selected]) => { setForm({ ...form, inDate: selected }); return selected } }
					/>
				</div>
			</div>

			<div id="until-date" className="form-group row">
				<label htmlFor="untilDate" className="col-sm-3 col-form-label">Data até:</label>
				<div className="col-sm-9">
					<Controller
						as={
							<DatePicker
								placeholderText='Escolha a data final'
								selected={form.untilDate}
								// onChange={ () => { console.log('mudo'); setForm({ ...form, untilDate: '' }) }}
								peekNextMonth
								showMonthDropdown
								showYearDropdown
								dropdownMode='select'
								className={`form-control ${errors.untilDate && 'is-invalid'}`}
								dateFormat='dd/MM/yyyy'
								locale='pt_BR'
							/>
						}
						name='untilDate'
						control={control}
						// errors={errors}
						rules={{required: true}}
						// register={register()}
						onChange={ ([selected]) => { setForm({ ...form, untilDate: selected }); return selected } }
					/>
				</div>
			</div>
			<div id="color" className="form-group row">
				<label htmlFor="color" className="col-sm-3 col-form-label">Cor:</label>

				<div className="col-sm-9">
					<GithubPicker
						id='color'
						name='color'
						triangle='hide'
						width='212px'
						color={form.color}
						onChangeComplete={ color => setForm({ ...form, color: color.hex }) }
					/>
				</div>
			</div>

			<div className="row justify-content-center pt-3">
				<div className="col-6">
					<input className="btn btn-secondary btn-block" type="submit" />
				</div>
			</div>
		</form>
	);
}
