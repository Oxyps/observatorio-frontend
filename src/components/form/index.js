import React, { useState, useEffect } from 'react';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ptBR from 'date-fns/locale/pt-BR';
registerLocale('pt_BR', ptBR);

// import './styles.css';

export default function FormComponent({ formData, onSubmit }) {
	const [form, setForm] = useState({});

	async function handleSubmit(event) {
		event.preventDefault();

		let {
			information,
			location,
			granularity,
			inDate,
			untilDate
		} = form;

		// yyyy-mm-dd format dates
		inDate = inDate.toISOString().slice(0,10);
		untilDate = untilDate.toISOString().slice(0,10);

		const [ locationName, locationType ] = location.split('_')

		await onSubmit({
			information,
			locationName,
			locationType,
			granularity,
			inDate,
			untilDate
		})
	}

	return(
		<form className="d-flex flex-column" onSubmit={handleSubmit}>
			<div id="information" className="form-group row">
				<label htmlFor="information" className="col-sm-3 col-form-label">Informação:</label>

				<div className="col-sm-9">
					<select
						id="information"
						className="custom-select"
						onChange={ e => setForm({ ...form, information: e.target.value }) }
					>
						<option value="0">Selecione um item</option>
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
						id="location"
						className="custom-select"
						onChange={ e => setForm({ ...form, location: e.target.value })}
					>
						<option value="0">Selecione um item</option>
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
						id="granularity"
						className="custom-select"
						onChange={ e => setForm({ ...form, granularity: e.target.value }) }
					>
						<option value="0">Selecione um item</option>
						{formData.granularities.map(granularity =>
							<option
								key={granularity.id}
								value={granularity.granularity}
							>{granularity.granularity}</option>
						)}
					</select>
				</div>
			</div>

			<div id="in-date" className="form-group row">
				<label htmlFor="in-date" className="col-sm-3 col-form-label">Data de:</label>

				<div className="col-sm-9">
					<DatePicker
						name="in-date"
						id="in-date"
						selected={form.inDate}
						onChange={date => setForm({ ...form, inDate: date })}
						peekNextMonth
						showMonthDropdown
						showYearDropdown
						dropdownMode="select"
						className="form-control"
						dateFormat="dd/MM/yyyy"
						locale="pt_BR"
					/>
				</div>
			</div>

			<div id="until-date" className="form-group row">
				<label htmlFor="until-date" className="col-sm-3 col-form-label">Data até:</label>

				<div className="col-sm-9">
					<DatePicker
						name="until-date"
						id="until-date"
						selected={form.untilDate}
						onChange={ date => setForm({ ...form, untilDate: date }) }
						peekNextMonth
						showMonthDropdown
						showYearDropdown
						dropdownMode="select"
						className="form-control"
						dateFormat="dd/MM/yyyy"
						locale="pt_BR"
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
