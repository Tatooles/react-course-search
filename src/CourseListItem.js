import React from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';

class CourseListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            color: 'white'
        }
    }

    onClick = () => {
        this.props.clickedCourse(this.props.number);

    }

    render() {
        return (
            <Nav.Link id="listItem" onClick={this.onClick}>{this.props.number}</Nav.Link>
            // <div id="listItem" style={{ textAlign: 'center' }}>
            //     <h1 onClick={this.onClick}>{this.props.number}</h1>
            // </div>
        )
    }
}

export default CourseListItem;
