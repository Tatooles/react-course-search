import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import CourseArea from "./CourseArea";
import CourseList from "./CourseList";
import Cart from './Cart'
import Offcanvas from 'react-bootstrap/Offcanvas';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      subjects: [],
      cartCourses: [],
      show: false,
      showCourse: undefined,
    };
  }

  componentDidMount() {
    fetch("https://cs571.cs.wisc.edu/api/react/classes")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          allCourses: data,
          filteredCourses: data,
          subjects: this.getSubjects(data),
        })
      );
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses });
  }

  // Make sure it's not a dupe, then add the course to the cart array
  addCourse = (course) => {
    for (let course1 of this.state.cartCourses) {
      if (course1.number === course.number) {
        this.deleteCourse(course.number);
      }
    }
    let copy = JSON.parse(JSON.stringify(course));
    this.setState((state, props) => ({
      cartCourses: [
        ...state.cartCourses,
        copy
      ]
    }));
  }

  // To add a section there are 3 cases:
  // Case 1: The section is already in the cart, in which case we do nothing
  // Case 2: The course is in the cart without the chosen section, in which case we simply push the section to the course's sections array
  // Case 3: The course is not in the cart, in which case we add a copy of the course with the other sections filtered out
  addSection = (course, section) => {
    let copy = [...this.state.cartCourses];
    for (let course1 of copy) {
      if (course1.number === course.number) {
        // Cart contains the course
        for (let section1 of course1.sections) {
          if (section1.number === section.number) {
            this.deleteSection(course.number, section.number);
          }
        }
        // Need to add just the course
        course1.sections.push(section);
        this.setState({
          cartCourses: copy
        });
        return;
      }
    }

    let newCourse = JSON.parse(JSON.stringify(course));
    // Now just need to filter the correct section from this new course
    newCourse.sections = newCourse.sections.filter(function (sect) {
      return sect.number === section.number;
    });

    copy.push(newCourse);
    this.setState({
      cartCourses: copy
    });
  }

  // To add a subsection there are 4 cases:
  // Case 1: The subsection is already in the cart, no further action needed
  // Case 2: The section is in the cart without the subsection, in which case we push the subsection to the section's subsection array
  // Case 3: The course is in the cart without the section, in which case we need to add the section to the course with the other subsections filtered out
  // Case 4: The course is not in the cart, in which case we need to add the course to the cart with all other sections and subsections fltered out
  addSubsection = (course, section, subsection) => {
    let copy = [...this.state.cartCourses];
    for (let course1 of copy) {
      if (course1.number === course.number) {
        for (let section1 of course1.sections) {
          if (section1.number === section.number) {
            for (let subsection1 of section1.subsections) {
              if (subsection1.number === subsection.number) {
                console.log("Subsection already in cart");
                return;
              }
            }
            // Just need to append subsection
            section1.subsections.push(subsection);
            this.setState({
              cartCourses: copy
            });
            return;
          }
        }

        // Need to add section and course
        let newSection = JSON.parse(JSON.stringify(section));
        newSection.subsections = newSection.subsections.filter(function (subsect) {
          return subsect.number === subsection.number;
        });

        course1.sections.push(newSection);
        this.setState({
          cartCourses: copy
        });
        return;

      }
    }

    // Need to add a new course with a new section that had just the one subsection
    let newCourse = JSON.parse(JSON.stringify(course));
    // Now just need to filter the correct section from this new course
    newCourse.sections = newCourse.sections.filter(function (sect) {
      return sect.number === section.number;
    });

    newCourse.sections[0].subsections = newCourse.sections[0].subsections.filter(function (subsect) {
      return subsect.number === subsection.number;
    });

    copy.push(newCourse);
    this.setState({
      cartCourses: copy
    });
  }


  // Deletes a full course
  deleteCourse = (dataFromCallback) => {
    this.setState({
      cartCourses: this.state.cartCourses.filter(function (course) {
        return course.number !== dataFromCallback;
      })
    });
  }

  // Filter out a section from the given course
  deleteSection = (number, section) => {
    // Gotta filter out this course and section
    let copy = [...this.state.cartCourses];
    for (let course of copy) {
      if (course.number === number) {
        course.sections = course.sections.filter(function (sect) {
          return sect.number !== section;
        });
      }
    }
    this.setState({
      cartCourses: copy
    });
  }

  // Filter out the given subsecton from the given section of the given course
  deleteSubsection = (number, section, subsection) => {
    let copy = [...this.state.cartCourses];
    for (let course of copy) {
      if (course.number === number) {
        for (let section1 of course.sections) {
          if (section1.number === section) {
            section1.subsections = section1.subsections.filter(function (subsect) {
              return subsect.number !== subsection;
            });
          }
        }
      }
    }
    this.setState({
      cartCourses: copy
    });
  }

  clickedCourse = (number) => {
    for (let course of this.state.filteredCourses) {
      if (course.number === number) {
        this.setState({
          showCourse: course
        });
      }
    }
  }


  handleShow = () => {
    this.setState({ show: true });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  render() {
    return (
      <>
        <Container>
          <Offcanvas show={this.state.show} placement="end" onHide={this.handleClose}>
            <Offcanvas.Header closeButton style={{ borderBottomStyle: 'solid', borderWidth: '2px' }}>
              <Offcanvas.Title><h1>Your Cart</h1></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Cart
                cart={this.state.cartCourses}
                deleteCourse={this.deleteCourse}
                deleteSection={this.deleteSection}
                deleteSubsection={this.deleteSubsection} />
            </Offcanvas.Body>
          </Offcanvas>

          <Row>
            <Col xs={4} style={{ height: '90vh', overflowY: 'auto' }}>
              <h1 style={{ paddingBottom: '10px', paddingTop: '10px', textAlign: 'center'}}>Course Search & Enroll</h1>
              <Sidebar
                setCourses={(courses) => this.setCourses(courses)}
                courses={this.state.allCourses}
                subjects={this.state.subjects}
                handleShow={this.handleShow}
              />

              <CourseList id="courseList"
                data={this.state.filteredCourses}
                clickedCourse={this.clickedCourse}
              />
            </Col>
            <Col style={{ height: '87vh', overflowY: 'auto', marginTop: '3vh' }}>
              <CourseArea
                data={this.state.filteredCourses}
                allData={this.state.allCourses}
                cartMode={false}
                addCourse={this.addCourse}
                addSection={this.addSection}
                addSubsection={this.addSubsection}
                showCourse={this.state.showCourse}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
