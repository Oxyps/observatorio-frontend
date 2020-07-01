import React, { Component } from 'react';

// import './styles.css';

export default class FormComponent extends Component {
	render() {
		const { informations } = this.props.formData;
		const { locations } = this.props.formData;
		const { granularities } = this.props.formData;

		return(
			<form>
				<h1>Form Component</h1>

				<div className="input-block">
					<label htmlFor="information">Informação:</label>
					<select id="information">
						<option value="">------</option>
						{informations.map(information =>
							<option
								key={information.id}
								value={information.nickname}
							>{information.nickname}</option>
						)}
					</select>
				</div>

				<div className="input-block">
					<label htmlFor="location">Localização:</label>
					<select id="location">
						<option value="">------</option>
						{locations.map(location =>
							<option
								key={location.id_ibge}
								value={location.name}
							>{location.name}</option>
						)}
					</select>
				</div>

				<div className="input-block">
					<label htmlFor="granularity">Granularidade:</label>
					<select id="granularity">
						<option value="bimonthly">------</option>
						{granularities.map(granularity =>
							<option
								key={granularity.id}
								value={granularity.granularity}
							>{granularity.granularity}</option>
						)}
					</select>
				</div>

				<div className="input-block">
					<label htmlFor="in-date">Data inicial:</label>
					<input type="date" name="in-date" id="in-date"/>
				</div>

				<div className="input-block">
					<label htmlFor="until-date">Data final:</label>
					<input type="date" name="until-date" id="until-date"/>
				</div>

				<button type="submit">Mostrar gráfico</button>
			</form>
		);
	}
}
