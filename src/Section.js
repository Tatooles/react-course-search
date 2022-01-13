import React from 'react'
import './App.css'
import Subsection from './Subsection.js'
import { Button } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';

class Section extends React.Component {
	constructor(props) {
		super(props);

		// Parse through time object and create string with days and corresponding times
		let timeString = "";
		for (const day of Object.keys(this.props.data.time)) {
			let time = day + ": " + this.props.data.time[day] + "\n";
			time = time.charAt(0).toUpperCase() + time.slice(1);
			timeString += time;
		}


		this.state = { tm: timeString };
	}

	// Create array of subsections
	getSubSections() {
		let subsections = [];

		for (const subsection of Object.values(this.props.data.subsections)) {
			subsections.push(
				<Subsection
					key={subsection.number}
					data={subsection}
					addSubsection={this.addSubsection} />
			)
		}

		return subsections;
	}

	addSection = () => {
		this.props.addSection(this.props.data);
	}

	addSubsection = (subsection) => {
		this.props.addSubsection(this.props.data, subsection);
	}


	render() {
		return (
			<>
				<Accordion>
					<Accordion.Item eventKey="0">
						<Accordion.Header><h4>{this.props.data.number} <Button variant="primary" onClick={this.addSection}>Add Section</Button></h4></Accordion.Header>
						<Accordion.Body>
							<div style={{ marginLeft: '40px', whiteSpace: 'pre-line' }}>
								<p><strong>Instructor:</strong> {this.props.data.instructor}</p>
								<p><strong>Location:</strong> {this.props.data.location}</p>
								<p style={{ marginBottom: '0px' }}><strong>Meeting Times:</strong></p>
								<p style={{ marginLeft: '40px' }}>{this.state.tm}</p>
								{this.props.data.subsections.length > 0 && <h5>Subsections</h5>}
								{this.getSubSections()}
							</div>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</>
		)
	}
}

export default Section;