import React, { Component } from 'react';

// import './styles.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
			<Form onSubmit={this.handleSubmit}>
				<h1>Form Component</h1>

				<Form.Group as={Row} controlId="information">
					<Form.Label column md={4}>Informação:</Form.Label>

					<Col md={8}>
						<Form.Control
							as="select"
							onChange={ e => this.setState({ information: e.target.value }) }
						>
							<option value="">------</option>
							{informations.map(information =>
								<option
									key={information.id}
									value={information.nickname}
								>{information.nickname}</option>
							)}
						</Form.Control>
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="location">
					<Form.Label column md={4}>Informação:</Form.Label>

					<Col md={8}>
						<Form.Control
							as="select"
							onChange={ e => this.setState({ location: e.target.value }) }
						>
							<option value="">------</option>
							{locations.map(location =>
								<option
									key={location.id_ibge}
									value={location.name}
								>{location.name}</option>
							)}
						</Form.Control>
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="granularity">
					<Form.Label column md={4}>Granularidade:</Form.Label>

					<Col md={8}>
						<Form.Control
							as="select"
							onChange={ e => this.setState({ granularity: e.target.value }) }
						>
							<option value="">------</option>
							{granularities.map(granularity =>
								<option
									key={granularity.id}
									value={granularity.granularity}
								>{granularity.granularity}</option>
							)}
						</Form.Control>
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="in-date">
					<Form.Label column md={4}>Data inicial:</Form.Label>

					<Col md={8}>
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
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="until-date">
					<Form.Label column md={4}>Data final:</Form.Label>

					<Col md={8}>
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
					</Col>
				</Form.Group>

				<Row>
					<Col>
						<Button type="submit">Mostrar gráfico</Button>
					</Col>
				</Row>
			</Form>
		);
	}
}
