import React from 'react';
import Modal, closeButton from 'react-bootstrap';

class Trigger extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false
        };
    }

    handleHide() {
        this.setState({ show: false });
    }
    render() {
        return (
            <div className="modal-container" style={{height: 200 }}>
            
            <Modal show={this.state.show} onHide={this.handleHide} container={this} aria-labelledby="contained-modal-title">
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
            Contained Modal
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Your race has been saved successfully!
                </Modal.Body>
                <Modal.Footer>
                    <Button onclick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                    </Modal>
                    </div>

        );
    }
}

render(<Trigger />);