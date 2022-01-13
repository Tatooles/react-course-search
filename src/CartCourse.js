import React from 'react';
import CartSection from './CartSection'
import './App.css';
import { Button } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';

class CartCourse extends React.Component {
    getCartSections() {
        let cartSections = [];

        for (const section of this.props.data.sections) {
            cartSections.push(
                <CartSection
                    key={section.number}
                    data={section}
                    deleteSection={this.deleteSection}
                    deleteSubsection={this.deleteSubsection} />
            )
        }

        return cartSections;
    }

    deleteCourse = () => {
        this.props.deleteCourse(this.props.data.number);
    }

    deleteSection = (section) => {
        this.props.deleteSection(this.props.data.number, section);
    }

    deleteSubsection = (section, subsection) => {
        this.props.deleteSubsection(this.props.data.number, section, subsection);
    }

    render() {
        if (this.getCartSections().length === 0) {
            return (
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><h3>{this.props.data.number} <Button variant="danger" onClick={this.deleteCourse}>Remove Course</Button></h3>
                        </Accordion.Header>
                    </Accordion.Item>
                </Accordion>
            )
        }
        return (
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <h3>{this.props.data.number} <Button variant="danger" onClick={this.deleteCourse}>Remove Course</Button></h3>
                    </Accordion.Header>
                    <Accordion.Body>
                        {this.getCartSections()}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            // <div>
            //     <h3>{this.props.data.number} <Button variant="danger" onClick={this.deleteCourse}>Remove Course</Button></h3>
            //     {this.getCartSections()}
            // </div>
        )
    }
}

export default CartCourse;