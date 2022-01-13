import React from 'react';
import './App.css';
import Course from './Course';

class CourseArea extends React.Component {
  getCourses() {
    let courses = [];

    for (const course of Object.values(this.props.data)) {
      if(this.props.showCourse !== undefined && course.number === this.props.showCourse.number){
        courses.push(
          <Course
            key={course.name}
            data={course}
            addCourse={this.addCourse}
            addSection={this.addSection}
            addSubsection={this.addSubsection} />
        )
      }
    }

    return courses;
  }

  addCourse = (course) => {
    this.props.addCourse(course);
  }

  addSection = (course, section) => {
    this.props.addSection(course, section);
  }

  addSubsection = (course, section, subsection) => {
    this.props.addSubsection(course, section, subsection);
  }

  render() {
    return (
      <div>
        {this.getCourses()}
      </div>
    )
  }
}

export default CourseArea;
