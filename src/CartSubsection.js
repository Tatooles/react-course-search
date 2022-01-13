import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';

class CartSubsection extends React.Component {
    deleteSubsection = () => {
        this.props.deleteSubsection(this.props.data.number);
    }

    render(){
        return (
            <div style={{ marginLeft: '40px' }}>
                <p>{this.props.data.number} <Button variant="danger" onClick={this.deleteSubsection}>Remove Subsection</Button></p>
            </div>
        )
    }
}

export default CartSubsection;