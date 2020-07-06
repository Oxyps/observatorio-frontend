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

		return(
			<form onSubmit={this.handleSubmit}>
				<h1>Form Component</h1>

				<div id="information">
					<label for="information">Informação:</label>

					<select
						onChange={ e => this.setState({ information: e.target.value }) }
					>
						<option value="">------</option>
						{informations.map(information =>
							<option
								key={information.id}
								value={information.nickname}
							>{information.nickname}</option>
						)}
					</select>
				</div>

				<div id="location">
					<label for="location">Localização:</label>

					<select
						onChange={ e => this.setState({ location: e.target.value }) }
					>
						<option value="">------</option>
						{locations.map(location =>
							<option
								key={location.id_ibge}
								value={location.name}
							>{location.name}</option>
						)}
					</select>
				</div>

				<div id="granularity">
					<label for="granularity">Granularidade:</label>

					<select
						onChange={ e => this.setState({ granularity: e.target.value }) }
					>
						<option value="">------</option>
						{granularities.map(granularity =>
							<option
								key={granularity.id}
								value={granularity.granularity}
							>{granularity.granularity}</option>
						)}
					</select>
				</div>

				<div id="in-date">
					<label for="in-date">Data inicial:</label>

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

				<div id="until-date">
					<label for="until-date">Data final:</label>

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

				<input type="submit" />
			</form>
		);
	}
}
