import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// import './styles.css';

export default class FormComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			information: '',
			location: '',
			granularity: '',
			inDate: '',
			untilDate: ''
		}
	}

	handleSubmit = async e => {
		e.preventDefault();

		let {
			information,
			location,
			granularity,
			inDate,
			untilDate
		} = this.state;

		// yyyy-mm-dd format dates
		inDate = inDate.toISOString().slice(0,10);
		untilDate = untilDate.toISOString().slice(0,10);

		await this.props.onSubmit({
			information,
			location,
			granularity,
			inDate,
			untilDate
		})
	}

	render() {
		const { informations } = this.props.formData;
		const { locations } = this.props.formData;
		const { granularities } = this.props.formData;

		// console.log(informationOptions);

		return(
			<form className="d-flex flex-column" onSubmit={this.handleSubmit}>
				<div id="information" className="form-group row">
					<label htmlFor="information" className="col-sm-3 col-form-label">Informação:</label>

					<div className="col-sm-9">
						<select
							id="information"
							className="custom-select"
							// value="0"
							onChange={ e => this.setState({ information: e.target.value }) }
						>
							<option value="0">Selecione</option>
							{informations.map(information => {
								return(
									<option
										key={information.id}
										value={information.nickname}
									>{information.nickname}</option>
								)
							}
							)}
						</select>
					</div>
				</div>

				<div id="location" className="form-group row">
					<label htmlFor="location" className="col-sm-3 col-form-label">Localização:</label>

					<div className="col-sm-9">
						<select
							id="location"
							className="custom-select"
							onChange={ e => this.setState({ location: e.target.value }) }
						>
							{locations.map(location =>
								<option
									key={location.id_ibge}
									value={location.nickname}
								>{location.name}</option>
							)}
						</select>
					</div>
				</div>

				<div id="granularity" className="form-group row">
					<label htmlFor="granularity" className="col-sm-3 col-form-label">Granularidade:</label>

					<div className="col-sm-9">
						<select
							id="granularity"
							className="custom-select"
							onChange={ e => this.setState({ granularity: e.target.value }) }
						>
							{granularities.map(granularity =>
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
						{/* adicionar id pro for */}
						<DatePicker
							selected={this.state.inDate}
							onChange={ date => this.setState({ inDate: date }) }
							peekNextMonth
							showMonthDropdown
							showYearDropdown
							dropdownMode="select"
							className="form-control"
							dateFormat="dd/MM/yyyy"
							// locale="pt-BR"
						/>
					</div>
				</div>

				<div id="until-date" className="form-group row">
					<label htmlFor="until-date" className="col-sm-3 col-form-label">Data até:</label>

					<div className="col-sm-9">
						{/* adicionar id pro for */}
						<DatePicker
							selected={this.state.untilDate}
							onChange={ date => this.setState({ untilDate: date }) }
							peekNextMonth
							showMonthDropdown
							showYearDropdown
							dropdownMode="select"
							className="form-control"
							dateFormat="dd/MM/yyyy"
							// locale="pt-BR"
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
}
