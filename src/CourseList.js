import React from 'react';
import './App.css';
import CourseListItem from './CourseListItem';
import Nav from 'react-bootstrap/Nav';

class CourseList extends React.Component {
  getCourses() {
    let courses = [];

    for (const course of Object.values(this.props.data)) {
      courses.push(
        <CourseListItem
          key={course.number}
          number={course.number}
          clickedCourse={this.clickedCourse}
          changeColor={this.changeColor}
        />
      )
    }

    return courses;
  }

  clickedCourse = (number) => {
    this.props.clickedCourse(number);
  }

  changeColor = () => {

  }

  render() {
    return (
      <div style={{ height: '45vh', overflowY: 'auto' }}>
        <Nav fill className="flex-column">
          {this.getCourses()}
        </Nav>
      </div>
    )
  }
}

export default CourseList;
