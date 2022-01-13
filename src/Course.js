import React from 'react';
import './App.css';
import Section from './Section'
import { Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Course extends React.Component {
  constructor(props) {
    super(props);

    // Parse through requisites and create string according to specified format
    let req = this.props.data.requisites;
    let requisitesString = "";
    if (req.length === 0) {
      requisitesString = "None";
    } else {
      for (let i = 0; i < req.length; i++) {
        requisitesString += "("
        if (req[i].length > 1) {
          for (let j = 0; j < req[i].length; j++) {
            requisitesString += req[i][j];
            if (j !== req[i].length - 1) {
              requisitesString += " OR "
            }
          }
        }
        else {
          requisitesString += req[i][0];
        }
        requisitesString += ")"
        if (i !== req.length - 1) {
          requisitesString += " AND "
        }
      }
    }


    // Add strings to state so they can be accessed in render()
    this.state = { reqString: requisitesString };

  }

  getKeywords() {
    let keywords = [];

    for (const keyword of this.props.data.keywords) {
      let word = keyword.charAt(0).toUpperCase() + keyword.slice(1);
      keywords.push(
        <Badge key={word} bg="secondary" style={{ margin: '5px' }}>{word}</Badge>
      )
    }

    return keywords;
  }

  // Creates array of sections to be displayed
  getSections() {
    let sections = [];

    for (const section of this.props.data.sections) {
      sections.push(
        <Section
          key={section.number}
          data={section}
          addSection={this.addSection}
          addSubsection={this.addSubsection} />
      )
    }

    return sections;
  }

  addCourse = () => {
    this.props.addCourse(this.props.data)
  }

  addSection = (section) => {
    this.props.addSection(this.props.data, section);
  }

  addSubsection = (section, subsection) => {
    this.props.addSubsection(this.props.data, section, subsection);
  }


  render() {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>{this.props.data.number}</h3>
          <Button variant="primary" id="addCourse" size='lg' onClick={this.addCourse}>Add Course</Button>
        </div>
        <h4>{this.props.data.name}</h4>
        {this.getKeywords()}
        <p>{this.props.data.description}</p>
        <Row>
          <Col>
            <p><strong>Credits:</strong> {this.props.data.credits}</p>
            <p><strong>Requisites:</strong> {this.state.reqString}</p>
            <p><strong>Subject:</strong> {this.props.data.subject}</p>
          </Col>
        </Row>

        <h3>Sections</h3>
        {this.getSections()}
      </>
    )
  }
}

export default Course;
