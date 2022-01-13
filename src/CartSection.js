import React from 'react';
import CartSubsection from './CartSubsection';
import './App.css';
import { Button } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';

class CartSection extends React.Component {
    getCartSubsections() {
        let cartSubsections = [];

        for (const subsection of this.props.data.subsections) {
            cartSubsections.push(
                <CartSubsection
                    key={subsection.number}
                    data={subsection}
                    deleteSubsection={this.deleteSubsection} />
            )
        }

        return cartSubsections;
    }

    // Gonna need to use a callback to delete items from the cart
    deleteSection = () => {
        this.props.deleteSection(this.props.data.number);
    }

    deleteSubsection = (subsection) => {
        this.props.deleteSubsection(this.props.data.number, subsection);
    }

    render() {
        if(this.getCartSubsections().length === 0){
            return (
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><h5>{this.props.data.number} <Button variant="danger" onClick={this.deleteSection}>Remove Section</Button></h5>
                        </Accordion.Header>
                    </Accordion.Item>
                </Accordion>
            )
        }
        return (
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><h5>{this.props.data.number} <Button variant="danger" onClick={this.deleteSection}>Remove Section</Button></h5>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div style={{ marginLeft: '40px', whiteSpace: 'pre-line' }}>
                            {this.getCartSubsections()}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
        )
    }
}

export default CartSection;