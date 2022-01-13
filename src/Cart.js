import React from 'react';
import CartCourse from './CartCourse'
import './App.css';

class Cart extends React.Component {
    getCartCourses() {
        let cartCourses = [];

        for (const course of this.props.cart) {
            cartCourses.push(
                <CartCourse
                    key={course.name}
                    data={course}
                    deleteCourse={this.deleteCourse}
                    deleteSection={this.deleteSection}
                    deleteSubsection={this.deleteSubsection} />
            )
        }

        return cartCourses;
    }

    // Gonna need to use a callback to delete items from the cart
    deleteCourse = (argument) => {
        this.props.deleteCourse(argument)
    }

    deleteSection = (number, section) => {
        this.props.deleteSection(number, section);
    }

    deleteSubsection = (number, section, subsection) => {
        this.props.deleteSubsection(number, section, subsection);
    }

    render() {
        return (
            <div>
                {this.getCartCourses()}
            </div>
        )
    }
}

export default Cart;