import React from 'react'
import './App.css'
import { Button } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';

class Subsection extends React.Component {
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

	addSubsection = () => {
		this.props.addSubsection(this.props.data);
	}


	render() {
		return (
			<>
				<Accordion>
					<Accordion.Item eventKey="0">
						<Accordion.Header><p>{this.props.data.number} <Button variant="primary" onClick={this.addSubsection}>Add Subsection</Button></p></Accordion.Header>
						<Accordion.Body>
							<div style={{ marginLeft: '40px' }}>
								<p><strong>Location:</strong> {this.props.data.location}</p>
								<p style={{ marginBottom: '0px' }}><strong>Meeting Times:</strong></p>
								<p style={{ marginLeft: '40px' }}>{this.state.tm}</p>
							</div>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</>
		)
	}
}

export default Subsection;